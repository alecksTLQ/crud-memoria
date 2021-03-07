import React, { Component} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood"},
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

class App extends Component {

  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id:'',
      personaje: '',
      anime: ''
    }
  }

  mostrarModalInsertar =()=>{
    this.setState({
      modalInsertar: true
    })
  }

  cerrarModalInsertar =()=>{
    this.setState({
      modalInsertar: false
    })
  }

  cerrarModalActualizar=()=>{
    this.setState({
      modalActualizar: false
    })
  }

  handleChange=(event)=>{
    this.setState({
      form: {
        ...this.state.form,
      [event.target.name]: event.target.value,
      }
    })
  }

  insertar=()=>{
    let datos = {...this.state.form}
    datos.id = this.state.data.length + 1
    let lista = this.state.data

    lista.push(datos)
    this.setState({
      modalInsertar: false, 
      data: lista
    })
  }

  mostrarModalActualizar =(dato)=>{
    this.setState({
      form: dato,
      modalActualizar: true
    })
  }

  editar =(dato)=>{
    let cont = 0;
    let arreglo = this.state.data

    arreglo.map((registro)=>{
      if(dato.id===registro.id){
        arreglo[cont].personaje = dato.personaje
        arreglo[cont].anime = dato.anime
      }
      cont++;
    })
    this.setState({
      data: arreglo,
      modalActualizar: false
    })

  }

  eliminar=(dato)=>{
    let opcion = window.confirm('Estas seguro que deseas eliminar el elemento '+dato.id)
    if(opcion===true){
      let cont = 0;
      let arreglo =  this.state.data
      arreglo.map((registro)=>{
        if(dato.id===registro.id){
          arreglo.splice(cont, 1)
        }
        cont++;
      })
      this.setState({
        data: arreglo, 
        modalActualizar: false
      })
    }
  }

  render(){
    return(
      <>
        <Container>
          <Button color='primary' onClick={this.mostrarModalInsertar} >Insertar nuevo personaje</Button>

          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>personaje</th>
                <th>anime</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((datos)=>{
                  return(

                    <tr key={datos.id}>
                      <td> {datos.id} </td>
                      <td> {datos.personaje} </td>
                      <td> {datos.anime} </td>
                      <td>
                        <Button 
                          color='warning' 
                          onClick={()=> this.mostrarModalActualizar(datos)}
                        >Edit</Button>
                        <Button color='danger' onClick={()=> this.eliminar(datos)}>Delete  </Button>
                      </td>
                    </tr>

                  )
                })
              }
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div> 
              <h3>Insertar personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input 
                className='form-control'
                readOnly
                type='text'
                value={
                  this.state.data.length +1
                }
              ></input>
            </FormGroup>

            <FormGroup>
              <label>Personaje</label>
              <input
                className='form-control'
                name='personaje'
                type='text'
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input
                className='form-control'
                name='anime'
                type='text'
                onChange={this.handleChange} 
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
                color="primary"
                onClick={this.insertar}
              >
                Insertar
              </Button>
              <Button
                className="btn btn-danger"
                onClick={this.cerrarModalInsertar}
              >
                Cancelar
            </Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=> this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={()=> this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    )
  }
}

export default App;
