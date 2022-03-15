import React from 'react';
import { Container, Col, Button, Row, ListGroup } from 'react-bootstrap';
import { theme } from '../config';

function PrimaryButton(props: any) {
    return (
        <Button bsPrefix={'showBtn'} onClick={props.onClick}>
            {props.text}
        </Button>
    );
}
