//I recommend creating classes for both customers and movies 

//Example movie class: 
export let inventory: Array<Movie> = [];

export class Movie {
  title: string;
  inStock: boolean;
  daysRented: number;

  constructor(title: string) {
    this.title = title;
    this.inStock = true;
    this.daysRented = 0;
  }

  rentMovie() {
    this.inStock = false;
  }
    //you need more functions than just this
}

export function addMovie(movie: Movie) {
  inventory.push(movie);
}

// Example test for the rent movie function:
test("rentMovie() should set inStock to false for a movie", () => {
  let movie1 = new Movie("Top Gun");
  let movie2 = new Movie("Titanic");

  movie1.rentMovie();

  expect(movie1.inStock).toBe(false);
  expect(movie2.inStock).toBe(true);
});
