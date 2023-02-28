import 'animate.css';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import Reaptcha from 'reaptcha';
import { Alert } from 'react-bootstrap';

import contactImg from "../assets/img/contact-img.svg";

export function Contact() {
  const form = useRef();
  const [buttonText, setButtonText] = useState('Enviar');
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const onVerify = (recaptchaResponse) => console.log(recaptchaResponse);
  
  const sendEmail = (e) => {
    e.preventDefault();
    setButtonText("Enviando...");
    emailjs.sendForm('service_tfs5n89', 'template_dnb3yjh', form.current, 'sq1WyKkddrDs7AcKd')
      .then((result) => {
          console.log(result.text);
          setResult(true);
      }, (error) => {
          console.log(error.text);
          setError(true);
      });
    setButtonText("Enviar");
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Vamos conversar?</h2>
                <form ref={form} onSubmit={sendEmail}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="username" placeholder="Nome" />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="lastname" placeholder="Sobrenome" />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name="email" placeholder="E-mail" />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" name="telephone" placeholder="Telefone"/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" name="message" placeholder="Mensagem"></textarea>
                      <Reaptcha
                        ref={ (e) => setCaptcha(e) }
                        sitekey="6Lc3zbskAAAAABxWOyiQ1HoWGdmi3zDvQmtJ0uXk"
                        onVerify={onVerify}
                        size="invisible"
                      />
                      <button onClick={ () => captcha.execute() } type="submit" value="Send"><span>{buttonText}</span></button>
                    </Col>
                  </Row>
                </form>
                    <br></br>
                    {result && 
                      <Alert variant="success" onClose={() => setResult(false)} dismissible>
                      <Alert.Heading>Sucesso!</Alert.Heading>
                      <p>
                        Mensagem enviada com sucesso!
                      </p>
                    </Alert> }
                    { error &&
                      <Alert variant="danger" onClose={() => setError(false)} dismissible>
                      <Alert.Heading>Erro!</Alert.Heading>
                      <p>
                        Ocorreu um erro inesperado!
                      </p>
                    </Alert>
                    }
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
