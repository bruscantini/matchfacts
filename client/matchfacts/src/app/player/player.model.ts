
export class Player {
  _id: string;
  playerId: string;
  firstName: string;
  lastName: string;
  number: string;
  picture: string;
  selectedYear: string;

  constructor(playerId: string, firstName: string, lastName: string, number: string, picture: string) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.picture = picture;
    this.selectedYear = 'careerTotalsRegularSeason';
  }
}
