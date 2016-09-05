import React, { PropTypes, Component } from 'react'

export default class Within extends Component {
  clicked(i, j) {
    var obj = {
        i: i,
        j: j
    }
    this.props.enableCell(obj)
  }
    
  render() {
    const { field } = this.props
    var point = this;
      
    return <div className="within">
            {field.map(function(item, i) {
                return(
                    <div className="row" key={i}>
                        {item.map(function(item, j){
                            var boundClick = point.clicked.bind(point, i, j);
                            if(!item){
                                return(<div className="cells disable" onClick={boundClick} key={j}></div>) 
                            }
                            else{
                                return(<div className="cells enable" onClick={boundClick} key={j}></div>) 
                            }     
                          })
                        }
                    </div>
                )          
              })
            }
    </div>     
  }
}

Within.propTypes = {
    field: PropTypes.array.isRequired,
    enableCell: PropTypes.func.isRequired
}
