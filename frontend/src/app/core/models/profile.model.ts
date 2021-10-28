import { Game } from './game.model';
import { User } from './user.model';

export class Profile {
  email: String;
  user: String;
  name: String;
  img: String;
  title: String;
  following: Boolean;

  constructor(
    email: string,
    user: string,
    name: string,
    img: string,
    title: string,
    following: boolean
  ){
    this.email = email;
    this.user = user;
    this.name = name;
    this.img = img;
    this.title = title;
    this.following = following;
  }
}