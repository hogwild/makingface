
const width = 960;
const height = 600;
const faceRadius= 300;
const centerX = width / 2;
const centerY = height / 2;
const eyeOffsetX = 90;
const eyeOffsetY = -100;
const eyeRadius = 40;
const strokeWidth = 20;
const mouthWidth = 10;
const mouthRadius = 160;


class Ball extends React.Component {
    render() {
        return <circle r={this.props.radius} stroke='black' stroke-width='3px' fill={this.props.color} 
        onMouseOver={this.props.onMouseHoveringOver} 
        onMouseOut={this.props.onMouseMovingOut}/>
    }
}

class Eye extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black"
        };
        //this.changeColor = this.changeColor.bind(this);
    }
    changeColor = () => {
        this.state.color === "black" ? this.setState({color:"red"}):this.setState({color:"black"})
    }
    render() {
        return <circle 
        cx= {this.props.x} 
        cy={this.props.y} 
        r={this.props.r} 
        fill={this.state.color}
        onMouseOver={this.changeColor}
        onMouseOut={this.changeColor}
        />;
    }
}

// function Nose(){
//     return <line x1='0' y1='-50' x2='0' y2='50' stroke='black' stroke-width='20px'></line>
// }

class Mouth extends React.Component {
    render() {
        const mouthArc = d3.arc()
            .innerRadius(this.props.radius)
            .outerRadius(this.props.radius + this.props.width)
            .startAngle( this.props.startAngle)
            .endAngle(this.props.endAngle);
        return (<g transform={`translate(0, ${this.props.offsetY})`}> 
                    <path d={mouthArc()} stroke-width='20px' fill='none'></path>
             </g>)
    }
}
class Face extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faceColor: 'lightgreen',
            mouthStartAngle: -Math.PI * 1/3,
            mouthEndAngle: Math.PI * 1/3,
            mouthOffsetY: 1.5*mouthRadius
        }
    }
    happy = () => {
        this.setState({
            faceColor: "yellow",
            mouthStartAngle: Math.PI * 2/3,
            mouthEndAngle: Math.PI * 4/3,
            mouthOffsetY: 0    
        });

    } 
    unhappy = () => {
        this.setState({
            faceColor: "lightgreen",
            mouthStartAngle: -Math.PI * 1/3,
            mouthEndAngle: Math.PI * 1/3,
            mouthOffsetY: 1.5*mouthRadius
        })
    }
    render() {
        return (
            <svg width={width} height={height}>
                <g transform={`translate(${centerX},${centerY})`} stroke='black' stroke-width='3px'>
                    <Ball radius={faceRadius} color={this.state.faceColor} 
                    onMouseHoveringOver={this.happy} onMouseMovingOut={this.unhappy}/>
                    <Eye x={eyeOffsetX} y={eyeOffsetY} r={eyeRadius}/>
                    <Eye x={-eyeOffsetX} y={eyeOffsetY} r={eyeRadius}/>
                    <Mouth radius={mouthRadius} width={mouthWidth} 
                    startAngle={this.state.mouthStartAngle}
                    endAngle={this.state.mouthEndAngle}
                    offsetY={this.state.mouthOffsetY}
                    />
                </g>
            </svg>
        )
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Face />, rootElement);