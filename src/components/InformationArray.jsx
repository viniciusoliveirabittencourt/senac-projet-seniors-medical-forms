import { Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import InformationNoTime from "./InformationNoTime";
import InformationTime from './InformationTime';

export default function InformationArray ({ time, arr, label, placeHolder, handler }) {
  const [arrayInfo, setArrayInfor] = useState(arr);
  const [nodeArr, setNodeArr] = useState(arr);

  useEffect(() => {
    handler(arrayInfo);
  }, [arrayInfo]);

  const setArray = (index, object) => {
    const newArr = arrayInfo;
    newArr.splice(index, 1, object);
    setArrayInfor([...newArr])
  };

  const deleteIndex = (index) => {
    const newArr = arrayInfo;
    console.log(newArr);
    newArr.splice(index, 1);
    console.log(newArr);
    setArrayInfor([...newArr]);
  }

  const addArray = () => {
    const newArr = nodeArr;
    nodeArr.push({
      information: '',
      observation: '',
    });
    setArrayInfor([...newArr])
  }

  const createNoTime = () => {
    if (arrayInfo.length === 0) {
      return ''
    };

    return nodeArr.map((i, j) => <InformationNoTime
        key={ j }
        label={ label }
        placeHolder={ placeHolder }
        deleteIndex={ deleteIndex }
        setArray={ setArray }
        index={ j }
        valueInfor={ i.information }
        valueObs={ i.observation }
      />
    );
  };

  const createTime = () => {
    if (arrayInfo.length === 0) {
      return ''
    };

    return nodeArr.map((i, j) => <InformationTime
        key={ j }
        label={ label }
        placeHolder={ placeHolder }
        deleteIndex={ deleteIndex }
        setArray={ setArray }
        index={ j }
        valueInfor={ i.information }
        valueObs={ i.observation }
      />
    );
  };

  return (
    <Row className="justify-content-md-center mb-3">
      <Col xs lg="10">
        { time ? createTime() : createNoTime() }
        <Button onClick={ () => addArray() }>
          { 'Adicionar +' }
        </Button>
      </Col>
    </Row>
  );
}