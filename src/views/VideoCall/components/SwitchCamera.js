import React, {useState, useEffect} from 'react'
import { Button, Modal, Form, Row, Col} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setCamera } from '../../../actions';

const SwitchCamera = (props) => {
    
    const [show, setShow] = useState(props.show);
    const [cameraList, setCameraList] = useState([]);
    const [selectCamera, setSelectCamera] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        getCameraList();
    },[])

    useEffect(()=>{
        setShow(props.show)
    },[props.show])

    const handleClose = () => setShow(false);
    const handleSave  = () => {
        dispatch(setCamera(selectCamera));
        setShow(false)
    }

    const getCameraList = () =>{
        var listCamera = []
        navigator.mediaDevices.enumerateDevices() 
        .then(function(devices) {
            console.log(devices)
            devices.forEach(function(device) {
                if(device.kind === 'videoinput'){
                    listCamera.push({
                        "deviceId" : device.label,
                        "deviceLabel" : device.deviceId
                    })
                }
                // if(device.kind === 'audioinput'){
                //     listCamera.push({
                //         "deviceId" : device.label,
                //         "deviceLabel" : device.deviceId
                //     })
                // }
            });
            setCameraList(listCamera)
            console.log(listCamera)
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
    const handleChooseCamera = (event) => {
        setSelectCamera(event.target.value)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เลือกกล้อง</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <fieldset>
                    <Form.Group as={Row}>
                    <Col sm={10}>
                        {
                            cameraList.map ((data, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        label={data.deviceId}
                                        name="chooseCameraRadio"
                                        id={data.deviceLabel}
                                        value={data.deviceLabel}
                                        onChange={handleChooseCamera}
                                    />
                                )
                            })
                        }
                    </Col>
                    </Form.Group>
                </fieldset>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                    บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SwitchCamera;