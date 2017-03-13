
export class Player {
  _id: string;
  playerId: string;
  firstName: string;
  lastName: string;
  number: string;
  image: string;
  stats: Object;

  constructor(playerId: string, firstName: string, lastName: string, number: string, image: string) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.image = image;
  }
}
