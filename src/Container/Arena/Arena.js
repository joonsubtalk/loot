import React, { Component } from 'react'
import Block from '../../Components/Block/Block';
import Hammer from 'react-hammerjs';

export default class Arena extends Component {

  state = {
    arenaArr: [],
    selecting: false,
    selection: {},
    selectedType: '',
    calculate: false,
  }

  componentDidMount() {
    this.setupArena();
  }

  setupArena = (cells) => {
    let arena = [];
    let height = 0;
    for (let idx = 0; idx < 36; idx++) {
      if (idx > 0 && idx % 6 === 0) height++
      arena.push({
        bid: idx,
        bType: this.generateType(),
        bX: (idx % 6 ) * 52,
        bY: height * 52,
      })
    }
    this.setState({arenaArr : arena});
  }

  generateType = () => {
    return Math.round(Math.random() * 5);
  }

  calculate = () => {
    console.log(this.state.selection)

    const {selection, arenaArr} = this.state;

    for (let property in selection) {
      const selectedId = parseInt(property);
      if (selection.hasOwnProperty(property)) {
          const obj = {
            bid: selectedId,
            bType: 'dead',
            bX: arenaArr[selectedId].bX,
            bY: arenaArr[selectedId].bY,
          }
        this.setState({arenaArr : [...arenaArr.slice(0,selectedId), obj ,...arenaArr.slice(selectedId+1)]})
      }
    }
    

    setTimeout(()=> {
      this.setState({selection : {}, selectedType : ''});
      console.log('cleared');
    }, 200)
  }
  
  onDown = (evt) => {
    this.setState({selecting : true});
  }

  onUp = () => {
    this.setState({selecting : false, calculate: true});
    
    this.calculate();
  }

  selectedHandler = (obj) => {
    const {selecting, selection, selectedType} = this.state;
    // only if selecting
    if (!selecting) return;

    const {bid, bType} = obj;

    // cancel on bad type
    if (selectedType !== '' && selectedType !== bType)
      return this.onUp();
    else
      this.setState({selectedType : bType});

    // mark on selection and same type
    if (selection[bid] === undefined) {
      selection[bid] = {...obj};
    }
  }

  render() {
    const {arenaArr, selecting} = this.state;
    const styleSelection = selecting ? 'arena--selecting' : '';

    return (
    <Hammer
      
    >
      <div className={`arena ${styleSelection}`}
        onPointerDown={this.onDown}
        onPointerMove={this.onMove}
        onPointerUp={this.onUp}
        onPointerCancel={this.onUp}
        onGotPointerCapture={this.onGotCapture}
        onLostPointerCapture={this.onLostCapture}
      >
        <div className="arena__container">
          {
            arenaArr.map((block) => {
              return <Block key={block.bid} {...block} cb={this.selectedHandler} />
            })
          }
        </div>
      </div>
    </Hammer>
    )
  }
}
