// Movie class should have functions for rentMovie, returnMovie, and incrementDaysRented
// Customer class should have fields name (string) and rentals (an array of Movies)
// Customer class should have functions for rentMovie and calculateRentalFees

//Example Customer class

// export class Customer {
//   name: string;
//   rentals: Array<Movie>;

//   constructor(name: string) {
//     this.name = name;
//     this.rentals = [];
//   }

//   rentMovie(movie: Movie) {
//     this.rentals.push(movie);
//     movie.incrementDaysRented();
//   }

//   calculateRentalFees(): number {
//     let cost = 0;
//     this.rentals.forEach((rental) => {
//       cost += rental.daysRented;
//     });

//     return cost;
//   }
// }

//Example test for customer class
// test("rentMovie() should add a movie to a customers rentals", () => {
//   let testMovie = new Movie("Avatar");
//   let testCustomer = new Customer("Bobby Joe");
//   testCustomer.rentMovie(testMovie);

//   expect(testCustomer.rentals).toContain(testMovie);
// });