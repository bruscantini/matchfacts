
export class Player {
  _id: string;
  firstName: string;
  lastName: string;
  number: string;
  image: string;
  stats: Object;

  constructor(firstName: string, lastName: string, number: string, image: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.image = image;
  }
}
