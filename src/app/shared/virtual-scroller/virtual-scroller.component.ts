import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash-es';
import { QueryConfig } from '../utils/query-config.utils/query-config.utils.component';
import {EventEmitter} from '@angular/core';

enum ScrollDirection {
  UP = 'up',
  DOWN = 'down'
}

enum ScrollListener {
  HOST = 'scroll',
  WINDOW = 'window:scroll'
}

@Component({
  selector: 'app-virtual-scroller',
  templateUrl: './virtual-scroller.component.html',
  styleUrls: ['./virtual-scroller.component.scss']
})
export class VirtualScrollerComponent implements OnInit, OnChanges, AfterViewInit {
  private static readonly SCROLL_DELAY = 500;

  @Input() config: QueryConfig;
  @Input() totalPages = 0;
  @Input() scrollOffset = 1200;
  @Input() nextItemsLoading = false;

  @Output() loadItems = new EventEmitter<any>();

  @HostListener('scroll') scroll: () => any;
  @HostListener('window:scroll') windowScroll: () => any;

  @HostListener('window:resize') windowResize: () => any;

  public scrollTop = 0;

  private readonly element: Element;
  private readonly window: Element;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
    this.window = document.documentElement as Element;
  }

  ngOnInit(): void {
    this.setThrottle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollDelay) {
      this.setThrottle();
    }

    if (changes.nextItemsLoading && !this.nextItemsLoading) {
      this.loadItemsInView();
    }
  }

  ngAfterViewInit(): void {
    this.loadItemsInView();
  }

  loadItemsInView = () => setTimeout(() => {
    this.handleScroll();
  })

  private setThrottle(): void {
    this.scroll = this.windowScroll = this.windowResize = _.throttle(this.handleScroll, VirtualScrollerComponent.SCROLL_DELAY);
  }

  private getListener = () => this.elementRef.nativeElement.clientHeight === this.elementRef.nativeElement.scrollHeight
    ? ScrollListener.WINDOW
    : ScrollListener.HOST

  private roundTo = (from: number, to: number = this.scrollOffset) => Math.floor(from / to) * to;
  private getScrollDirection = (scroll: number) => this.scrollTop <= scroll ? ScrollDirection.DOWN : ScrollDirection.UP;

  private canScroll(element: Element): boolean {
    const scrolled = this.getScrollDirection(element.scrollTop) === ScrollDirection.DOWN
      && this.roundTo(element.clientHeight) === this.roundTo(element.scrollHeight - element.scrollTop);
    this.scrollTop = element.scrollTop;
    return scrolled;
  }

  private handleScroll = () => this.getListener() === ScrollListener.HOST
    ? this.onScrolled(this.canScroll(this.element))
    : this.onScrolled(this.canScroll(this.window))

  private onScrolled(scrolled: boolean): void {
    if (scrolled && this.config && this.totalPages && !this.isLastPage) {
      this.loadItems.emit(this.currentPage + 1);
    }
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  get currentPage(): number {
    return this.config?.pager.page;
  }
}
