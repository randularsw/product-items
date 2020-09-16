import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { getItems } from "../services/item-service";
import { CartContext } from "../core/cartContext";
import { Drawer } from "@material-ui/core";

class ItemsList extends Component {
  static contextType = CartContext;
  state = {
    items: [],
    filteredItems: [],
    orderedItems: [],
    cartOpen: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const items = await getItems();
      if (items.data) {
        const filteredItems = items.data;
        const orderedItems = filteredItems;
        this.setState({ items: items.data, filteredItems, orderedItems });
      } else {
        this.displayError(items.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  displayError(error) {
    this.setState({ error });
  }

  closeError() {
    this.setState({ error: null });
  }

  filterBySize(size) {
    const filteredItems = this.state.items.filter((item) => {
      return item.details.size === size;
    });
    this.setState({ filteredItems, orderedItems: filteredItems });
  }

  orderByPrice() {
    const orderedItems = this.state.filteredItems.sort((a, b) =>
      a.details.price > b.details.price ? 1 : -1
    );
    this.setState({ orderedItems });
  }

  addToCart(item) {
    this.context.newCartItem(item);
    console.log(this.context.state.cartItems);
  }

  removeFromCart(id) {
    this.context.removeCartItem(id);
    console.log(this.context.state.cartItems);
  }

  toggleDrawer(status) {
    const cartOpen = status;
    this.setState({ cartOpen });
  }

  render() {
    const { orderedItems } = this.state;
    return (
      <>
        {this.state.error && (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Error</strong> <span>{this.state.error}</span>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.closeError()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="d-flex flex-row-reverse">
          <Button className="m-2" onClick={() => this.toggleDrawer(true)}>
            <i className="fas fa-shopping-cart"></i> {this.context.state.count}
          </Button>
        </div>
        <Drawer
          anchor="right"
          open={this.state.cartOpen}
          onClose={() => this.toggleDrawer(false)}
        >
          <div>
            <div style={{ width: "500px", maxWidth: "500px" }}>
              <h4 className="m-4">
                <i className="fas fa-shopping-cart"></i>{" "}
                {this.context.state.count} Bag
              </h4>
              {this.context.state.cartItems?.map((cartItem) => (
                <div className="m-4" key={cartItem.id}>
                  <div className="d-flex flex-row-reverse">
                    <Button
                      size="sm"
                      outline
                      onClick={() => this.removeFromCart(cartItem.id)}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </div>
                  <Row>
                    <Col md="3">
                      <img
                        src={cartItem.details.image}
                        height="30rem"
                        alt="..."
                        className="img-thumbnail"
                      />
                    </Col>
                    <Col md="5">
                      <p>{cartItem.name}</p>
                      <p>Quantity: {cartItem.quantity}</p>
                    </Col>
                    <Col md="3">$ {cartItem.price}</Col>
                  </Row>
                </div>
              ))}
              <Row className="m-4">
                <Col md="8">Total: </Col>
                <Col md="3">$ {this.context.state.price}</Col>
              </Row>
            </div>
          </div>
        </Drawer>
        <Row className="mt-5">
          <Col md="3">
            <p>Sizes</p>
            <div>
              <Button onClick={() => this.filterBySize("xsmall")}>XS</Button>{" "}
              <Button onClick={() => this.filterBySize("small")}>S</Button>{" "}
              <Button onClick={() => this.filterBySize("medium")}>M</Button>{" "}
              <Button onClick={() => this.filterBySize("mlarge")}>ML</Button>
            </div>
            <div className="mt-1">
              <Button onClick={() => this.filterBySize("large")}>L</Button>{" "}
              <Button onClick={() => this.filterBySize("xlarge")}>XL</Button>{" "}
              <Button onClick={() => this.filterBySize("xxlarge")}>XXL</Button>
            </div>
          </Col>
          <Col>
            <Row className="m-2">
              <Col md="9">{orderedItems.length} Product(s) found </Col>
              <Col md="3">
                {" "}
                Order by
                <Input type="select" name="select">
                  <option>Select</option>
                  <option onClick={() => this.orderByPrice()}>Price</option>
                </Input>
              </Col>
            </Row>
            <Container>
              <Row>
                {orderedItems.map((item) => (
                  <Card
                    key={item.id}
                    style={{ width: "18rem", height: "35rem" }}
                    className="m-2"
                  >
                    <div className="d-flex flex-row-reverse">
                      <Badge color="secondary" size="sm" className="m-2">
                        {item.details.tag}
                      </Badge>
                    </div>
                    <CardImg
                      top
                      height="60%"
                      src={item.details.image}
                      alt="item"
                    />
                    <CardBody>
                      <CardTitle>{item.name}</CardTitle>
                      <CardSubtitle>$ {item.details.price}</CardSubtitle>
                    </CardBody>
                    <CardFooter
                      Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => this.addToCart(item)}
                      className=""
                    >
                      Add to cart
                    </CardFooter>
                  </Card>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
  }
}

export default ItemsList;
