import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    // for testing ErrorBoundary
    // throw new Error("lol");
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city},
                ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loding ...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {/* {(themeHook) => ( 
              // 0 because in classes it provides both theme and set theme
              // or it can be destructured like below
              <button style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button> */}
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
              // both ways need these parenthesees to close the expressions
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// doing this because ErrorBoundary catches errors only in it's children
// it wouldn't work the same if it was in return above because
// it would only catch errors from Carousel and not from the
// whole component around it
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
