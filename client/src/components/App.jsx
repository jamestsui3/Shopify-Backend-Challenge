import React from 'react' ;
import axios from 'axios' ;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      items: [],
      locations: [],
      locationInput : '',
      itemInput: '',
      itemQuantity: 0,
      clicked : false,
      editId : '',
      locationId : 0
    }
    this.onClickLocation = this.onClickLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onClickInventory = this.onClickInventory.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onDeleteLocationClick = this.onDeleteLocationClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onEditSubmit= this.onEditSubmit.bind(this)
  }

  componentDidMount(){
    axios.all([
      axios.get('/inventory'),
      axios.get('/location')
    ])
    .then(data => {
      this.setState({
        items: data[0].data,
        locations: data[1].data
      })
    })
  }
  handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }
  onClickInventory(){
    if (this.state.itemInput === ''){
      alert('enter item name')
    } else {
      axios.post('/inventory', {
      item: this.state.itemInput,
      quantity: this.state.itemQuantity
    })
    .then(data => {
      axios.get('/inventory')
      .then(data => {
        this.setState({
          items: data.data
        })
      })
    })
    }
  }
  onClickLocation(){
    if (this.state.locationInput === ''){
      alert('Enter a location')
    } else {
      axios.post('/location', {
      place: this.state.locationInput
    })
    .then(data => {
      axios.get('/location')
      .then(data => {
        this.setState({
          locations: data.data
        })
      })
    })
    }
  }
  onDeleteClick(event){
    axios.delete('/inventory', {
      data: {id: Number(event.target.value)}
    })
    .then(data => {
      (axios.get('/inventory'))
      .then(data => {
        this.setState({
          items: data.data
        })
      })
    })
  }

  onDeleteLocationClick(event){
    axios.delete('/location', {
      data: {id : Number(event.target.value)}
    })
    .then(data => {
      axios.get('/location')
      .then(data => {
        this.setState({
          locations: data.data
        })
      })
      .then(data => {
        axios.get('/inventory')
        .then(data => {
          this.setState({
            items : data.data
          })
        })
      })
    })
  }
  onEditClick(event){
    this.setState({
      clicked: true,
      editId: event.target.value,
      itemInput: '',
      itemQuantity: 0,
      locationInput : ''
    })
  }
  onRadioChange(event){
    this.setState({
      locationId : event.target.value
    })
  }
  onEditSubmit(event){
    event.preventDefault()
    if (this.state.itemInput === ''){
      alert("Enter item name")
    } else {
      var data = {data : {item : this.state.itemInput, quantity : this.state.itemQuantity}, id: this.state.editId}
    axios.put('/inventory', data)
    .then(data => {
        if (this.state.locationId === "0" || this.state.locationId === 0){
          var myData = {data : {locationId : null}, id: this.state.editId}
        } else{
          var myData = {data : {locationId : this.state.locationId}, id:
            this.state.editId}
        }
        axios.put('/location', myData)
        .then(data => {
          axios.get('/inventory')
          .then(data => {
            this.setState({
            items : data.data,
            clicked: false,
            itemQuantity: 0,
            itemInput : ''
          })
          })
        })
    })
    }
  }

  render(){
    if (this.state.clicked === true){
      return (
        <div>
        <form>
          <label>Item: <input type="text" onChange={this.handleChange} name="itemInput"/> </label>
          <label>Quantity:  <input type="number" min="0" onChange={this.handleChange} name="itemQuantity" value={this.state.itemQuantity} /></label>
          {this.state.locations.map(location =>
            <label> <input type="radio" value={location.id} checked={this.state.locationId === location.id.toString() } onChange={this.onRadioChange}/> {location.place}
            </label>
          )}
          <label> <input type="radio" value="0" checked={this.state.locationId === "0"} onChange={this.onRadioChange}/> No location</label>
          <button onClick={this.onEditSubmit}> EDIT </button>
          </form>
        </div>
      )
    } else {
      return (
      <div>
       <table>
         <thead>
           <tr>
           <th> Name Of Item</th>
           <th> Quantity</th>
           <th> Location</th>
           <th> edit</th>
           <th> delete</th>
           </tr>
         </thead>
       <tbody>
         {this.state.items.map(item =>
          <tr key = {item.id}>
           <td>{item.item}</td>
           <td>{item.quantity}</td>
           <td>{item.location !== null ? item.location.place : ''}</td>
           <td><button onClick={this.onEditClick} value={item.id}>Edit</button></td>
           <td><button value={item.id} onClick={this.onDeleteClick}>Delete</button></td>
        </tr>)}
       </tbody>

       </table>

      <form>
        <label>Item: <input type="text" onChange={this.handleChange} value={this.state.itemInput} name='itemInput' /></label>
        <label>Quantity: <input type="number" min="0" onChange={this.handleChange} value={this.state.itemQuantity} name='itemQuantity'/></label>
        <input type="button" value="ADD" onClick={this.onClickInventory}/>
      </form>
      <form>
        <label>Location: <input type="text" onChange={this.handleChange} value ={this.state.locationInput} name='locationInput'/></label>
        <input type="button" value="ADD"  onClick={this.onClickLocation}/>
      </form>




        <table>
        <thead>
          <tr>
            <th> Location</th>
            <th> delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map(location =>
            <tr key= {location.id}>
            <td> {location.place}</td>
            <td> <button value={location.id} onClick={this.onDeleteLocationClick} > Delete</button></td>
            </tr>
          )}
        </tbody>
        </table>


      </div>
    )
  }
    }
}


export default App;