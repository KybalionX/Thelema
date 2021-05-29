import React from 'react'
import Card from 'react-bootstrap/Card'

function Home(){
    return(
        <div style={{padding: '12px'}}>
            <Card style={{margin: '12px auto', maxWidth: '1000px'}}>
                <Card.Body>
                    <h2 style={{textAlign: 'center'}}>Organizalo todo con Thelema!</h2>
                </Card.Body>
            </Card>
        </div>
    )
};

export default Home;