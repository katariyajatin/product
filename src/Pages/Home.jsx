import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row, Button } from 'react-bootstrap'; 
const Home = () => {
  const [product, setProducts] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching the products', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {
          product != null ? 
            product.map((v, i) => (
              <Col md={4} key={i} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={v.thumbnail} />
                  <Card.Body>
                    <Card.Title>{v.title}</Card.Title>
                    <Card.Text>{v.description}</Card.Text>
                    <Card.Text><strong>${v.price}</strong></Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            )) 
            : 
            <p>Loading products...</p>
        }
      </Row>
    </Container>
  );
};

export default Home;
