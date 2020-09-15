import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from "reactstrap";
import { getItems } from "../services/item-service";
import { CartContext } from "../core/cartContext";
import { Drawer } from "@material-ui/core";

class ItemsList extends Component {
  static contextType = CartContext;
  state = { items: [], filteredItems: [], cartOpen: false };

  async componentDidMount() {
    try {
      const items = await getItems();
      const filteredItems = items.data;
      this.setState({ items: items.data, filteredItems });
    } catch (err) {}
  }

  filterBySize(size) {
    const filteredItems = this.state.items.filter((item) => {
      return item.details.size == size;
    });
    this.setState({ filteredItems });
  }

  addToCart(item) {
    // console.log(item);
    this.context.newCartItem(item);
    console.log(this.context.state.cartItems);
  }

  toggleDrawer(status) {
    const cartOpen = status;
    this.setState({ cartOpen });
  }

  render() {
    const { items, filteredItems } = this.state;
    return (
      <>
        <div className="d-flex flex-row-reverse">
          <Button className="m-2" onClick={() => this.toggleDrawer(true)}>
            <i className="fas fa-shopping-cart"></i>
          </Button>
        </div>
        <Row className="mt-5">
          <Drawer
            anchor="right"
            open={this.state.cartOpen}
            onClose={() => this.toggleDrawer(false)}
          >
            <div>
              <div style={{ width: "500px", maxWidth: "500px" }}>
                <h4 className="m-4">Bag</h4>
                {this.context.state.cartItems?.map((cartItem) => (
                  <div className="m-4">
                    <div className="d-flex flex-row-reverse">
                      <i class="fas fa-times"></i>
                    </div>
                    <Row>
                      {/* <Col md="1"></Col> */}
                      <Col md="3">
                        <img
                          src={cartItem.details.image}
                          height="30rem"
                          alt="..."
                          class="img-thumbnail"
                        />
                      </Col>
                      <Col md="5">
                        {cartItem.name}
                        Quantity: {cartItem.quantity}
                      </Col>
                      <Col md="3">$ {cartItem.price}</Col>
                      {/* <Col md="1"></Col> */}
                    </Row>
                  </div>
                ))}
                <Row className="m-4">
                  {/* <Col md="1"></Col> */}
                  <Col md="8">Total: </Col>
                  <Col md="3">$ {this.context.state.price}</Col>
                  {/* <Col md="1"></Col> */}
                </Row>
              </div>
            </div>
          </Drawer>
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
            <p>{filteredItems.length} Product(s) found</p>
            <Container>
              <Row>
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    style={{ width: "18rem", height: "35rem" }}
                    className="m-2"
                  >
                    {/* <p className="d-flex flex-row-reverse mt-2 mr-3">Free shipping</p> */}
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
