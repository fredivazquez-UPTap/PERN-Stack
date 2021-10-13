import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ContactForm() {
  return (
    <Card body className="w-100">
      <Card.Title>Formulario de Contacto</Card.Title>
      <Form method="post">
        <FormLabel>Nombre completo</FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Nombre(s)"
            name="firstName"
            required
          />
          <FormControl
            type="text"
            placeholder="Apellido(s)"
            name="lastName"
            required
          />
        </InputGroup>
        <Row>
          <FormGroup as={Col} className="mb-3" controlId="email">
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl
              type="email"
              placeholder="nombre@ejemplo.com"
              name="email"
              required
            />
          </FormGroup>
          <FormGroup as={Col} className="mb-3" controlId="phoneNumber">
            <FormLabel>Número telefónico</FormLabel>
            <FormControl
              type="tel"
              placeholder="999 99 99 999"
              name="phoneNumber"
              required
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} className="mb-3" controlId="company">
            <FormLabel>Compañia</FormLabel>
            <FormControl
              type="text"
              placeholder="Nombre de la compañia"
              name="company"
              required
            />
          </FormGroup>
          <FormGroup as={Col} className="mb-3" controlId="country">
            <FormLabel>País</FormLabel>
            <Form.Select
              aria-label="Default select example"
              name="country"
              required
            >
              <option>Seleccionar pais</option>
              <option value="1">México</option>
              <option value="2">Canadá</option>
              <option value="3">Estados Unidos</option>
            </Form.Select>
          </FormGroup>
        </Row>
        <FormGroup className="mb-3" controlId="commentaries">
          <FormLabel>Comentarios</FormLabel>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe aquí tus comentarios..."
          />
        </FormGroup>
        <Button variant="primary" className="w-100" type="submit">
          Enviar <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Form>
    </Card>
  );
}

export default ContactForm;
