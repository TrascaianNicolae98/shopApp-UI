export class User{
  private email: string;
  private name: string;
  private imageUrl: string;
  private jwt: string;
  private id: number;

  constructor(){}

  public getJwt(): string{
    return this.jwt;
  }

  public setEmail(email: string): void{
    this.email = email;
  }

  public setImageUrl(imageUrl: string): void{
    this.imageUrl = imageUrl;
  }

  public setName(name: string): void{
    this.name = name;
  }


  public setGoogleData(googleUser: any): void{
    const profile = googleUser.getBasicProfile();
    this.name = profile.getName();
    this.imageUrl = profile.getImageUrl();
    this.email = profile.getEmail();
  }

  public getEmail(): string{
    return this.email;
  }

  public getName(): string{
    return this.name;
  }

  public getImageUrl(): string{
    return this.imageUrl;
  }

  public setJwt(jwt: string): void{
    this.jwt = jwt;
  }

  public getId(): number{
    return this.id;
  }

  public setId(id: number): void{
    this.id = id;
  }

  public getInitials(): string{
    const nameSplitBySpace = this.getName().split(' ');
    return nameSplitBySpace[0][0] + nameSplitBySpace[1][0];
  }
}
