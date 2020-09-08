import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function DishDetailRender(props){
    const dish = props.dish;
    if(dish != null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {
                                dish.comments.map(comment => {
                                    return (
                                        <li key={comment.id} className="mt-3">
                                            {comment.comment}<br/>
                                            -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        
                    </div>
                </div>
            </div>
        );
    }
    return(<div></div>);
}

function RenderDish(dish){
    return(
        <Card>
            <CardImg width="100%" src = {dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}


export default DishDetail;