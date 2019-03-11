import React from 'react'
import PropTypes from 'prop-types'

const Block = (props) => {
  const { bType, bX, bY, bid } = props;
  const style={left: bX, top: bY}

  const icon = ((bType) => {
    switch(bType) {
      case 0:
        return 'fa fa-bacon';
      case 1:
        return 'fa fa-hamburger';
      case 2:
        return 'fa fa-pizza-slice';
      case 3:
        return 'fa fa-egg';
      case 4:
        return 'fa fa-ice-cream';
      case 5:
        return 'fa fa-eye';
      default:
        return 'fa fa-spinner';
    }
  })(bType);

  return (
    <div className="block" style={style} onMouseOver={()=>{props.cb({bid, bType})}}>
      <div className="block__container">
        <i className={icon}></i>
      </div>
    </div>
  )
}

Block.propTypes = {
    blockName: PropTypes.string,
}

export default Block;
