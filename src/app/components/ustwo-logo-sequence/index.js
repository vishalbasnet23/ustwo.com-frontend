import React from 'react';
import classnames from 'classnames';
import SVGSequenceAnimation from 'app/lib/svg-sequence-animation';
import blendColours from 'app/lib/blend-colours';

const tickerFrequency = 50;
const timerTotal = 1000;
// const leftColours = ['#16D6D9', '#14C04D', '#96CC29', '#FFBF02', '#FF5519', '#E60C29', '#ED0082', '#6114CC', '#143FCC', '#009CF3'];
// const rightColours = ['#96CC29', '#FFBF02', '#FF5519', '#E60C29', '#ED0082', '#6114CC', '#143FCC', '#009CF3', '#16D6D9', '#14C04D'];
// const leftColours = ['#ED0082', '#143FCC', '#009CF3', '#96CC29', '#FF5519', '#ED0082'];
// const rightColours = ['#FFBF02', '#E60C29', '#6114CC', '#009CF3', '#14C04D', '#FFBF02'];
const leftColours = ['#96CC29', '#16D6D9', '#FA7D78', '#FFBF02', '#96CC29'];
const rightColours = ['#16D6D9', '#009CF3', '#6114CC', '#ED0082', '#16D6D9'];

function goToNextIteration(component) {
  component.setState({ tick: timerTotal });

  if (component.state.iterate === leftColours.length - 2) {
    component.setState({ iterate: 0 });
  } else {
    component.setState({ iterate: component.state.iterate + 1 });
  }
}

const UstwoLogoSequence = React.createClass({

  /* TODO: Create a wrapper component instead of using mixins */
  mixins: [SVGSequenceAnimation({ fps: 18 })],

  getInitialState() {
    return {
      show: false,
      tick: timerTotal,
      iterate: 0
    }
  },

  ticker() {
    /* Manage how often we cycle through iterations (sets of background colours) */
    if (this.state.tick === 0) {
      goToNextIteration(this);
    }
    this.setState({ tick: this.state.tick - tickerFrequency });
  },

  componentDidMount() {
    /* Use change in state to control the 'show' class allowing for css transition in */
    setTimeout(() => {
      this.setState({ show: true });
    }.bind(this), 1000);
    setTimeout(() => {
      this.timer = setInterval(this.ticker, tickerFrequency);
    }.bind(this), 2500);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  render() {
    const classes = classnames('ustwo-logo-sequence', this.props.customClass, {
      show: this.state.show
    });

    const progress = Math.round(((timerTotal - this.state.tick) / timerTotal) * 100) / 100;

    let leftColour, rightColour;
    if (this.state.show) {
      leftColour = blendColours(leftColours[this.state.iterate], leftColours[this.state.iterate + 1], progress);
      rightColour = blendColours(rightColours[this.state.iterate], rightColours[this.state.iterate + 1], progress);
    }

    return (
      <div className={classes}>
        <svg className="home-loader-sequence" ref="animsvg" title="ustwo logo sequence" role="img" viewBox="0 0 112 32">
          <g id="Frame1">
            <defs>
              <linearGradient id="linear">
                <stop offset="0%" stopColor={`#${leftColour}`} />
                <stop offset="100%" stopColor={`#${rightColour}`} />
              </linearGradient>
            </defs>
            <path fill="url(#linear)" />
          </g>
          <g id="Frame2">
            <path fill="url(#linear)" d="M4.79,13.85l0-.08L2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L9.5,16a2.91,2.91,0,0,1-2.67.11C5.33,15.44,4.52,14.63,4.79,13.85Z"/>
          </g>
          <g id="Frame3">
            <path fill="url(#linear)" d="M2.67,19.86l2.09-6.1L2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22a2.91,2.91,0,0,1-2.67.11C3.21,21.46,2.4,20.65,2.67,19.86Z"/>
          </g>
          <g id="Frame4">
            <path fill="url(#linear)" d="M5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22Z"/>
          </g>
          <g id="Frame5">
            <path fill="url(#linear)" d="M16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l6.47-5.62s1.09-.86,1.94,1.1S16.28,20.58,16,20.81Z"/>
          </g>
          <g id="Frame6">
            <path fill="url(#linear)" d="M16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05a9.75,9.75,0,0,1-2.57,2.76C20,17.29,16,20.81,16,20.81Z"/>
          </g>
          <g id="Frame7">
            <path fill="url(#linear)" d="M20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84A22.72,22.72,0,0,1,20.13,30Z"/>
          </g>
          <g id="Frame8">
            <path fill="url(#linear)" d="M28,21.1,20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84l5.18-5.71S26.59,18,28,21.1Z"/>
          </g>
          <g id="Frame9">
            <path fill="url(#linear)" d="M35.48,12.6,20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21s.82,1.67-1,1.67A6.63,6.63,0,0,0,35.48,12.6Z"/>
          </g>
          <g id="Frame10">
            <path fill="url(#linear)" d="M38.63,16.69c3.31-1.43,3.1-3.71,3.1-3.71,0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6v1.27S35.38,18.09,38.63,16.69Z"/>
          </g>
          <g id="Frame11">
            <path fill="url(#linear)" d="M35.38,26.16l.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58a2.93,2.93,0,0,1-3.16,3.16C35,29.75,35.38,26.16,35.38,26.16Z"/>
          </g>
          <g id="Frame12">
            <path fill="url(#linear)" d="M41.43,28.49A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.23-1.8,2.58-.88l1.64-3.82a2,2,0,0,1-1.93-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h1.73A1.83,1.83,0,0,1,24.9,1.39l1.23,2.49c.39.76.3,1.2-.45,1.2H24.12L22.48,8.91c2,1.38,2.66,1.88,2,4.12L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75"/>
          </g>
          <g id="Frame13">
            <path fill="url(#linear)" d="M41.43,28.49A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.23-1.8,2.58-.88l1.64-3.82a2,2,0,0,1-1.93-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22H40.49a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H24.12L22.48,8.91c2,1.38,2.66,1.88,2,4.12L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75"/>
          </g>
          <g id="Frame14">
            <path fill="url(#linear)" d="M41.43,28.49A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.23-1.8,2.58-.88l1.64-3.82a2,2,0,0,1-1.93-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22H51.94a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H24.12L22.48,8.91c2,1.38,2.66,1.88,2,4.12L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75"/>
          </g>
          <g id="Frame15">
            <path fill="url(#linear)" d="M41.43,28.49A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.23-1.8,2.58-.88l1.64-3.82a2,2,0,0,1-1.93-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22H63.53A1.83,1.83,0,0,1,65.3,1.39l1.23,2.49c.39.76.3,1.2-.45,1.2h-42L22.48,8.91c2,1.38,2.66,1.88,2,4.12L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75"/>
          </g>
          <g id="Frame16">
            <path fill="url(#linear)" d="M41.43,28.49A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.23-1.8,2.58-.88l1.64-3.82a2,2,0,0,1-1.93-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22H73.57a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2h-52L22.48,8.91c2,1.38,2.66,1.88,2,4.12L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75"/>
          </g>
          <g id="Frame17">
            <path fill="url(#linear)" d="M41.43,28.49a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.07-2.74-2-4.12l1.64-3.82H51.18l-.67,2.12s-.9,3,1.79,4.1,3.33-.61,3.33-.61l.59-1.81s.84-1.9-1.45-3.09l-1.3-.7H86c.74,0,.83-.44.45-1.2L85.18,1.39A1.83,1.83,0,0,0,83.42.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49a2,2,0,0,0,1.93,1.25L22.48,8.91c-1.35-.91-2.11-.49-2.58.88l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44"/>
          </g>
          <g id="Frame18">
            <path fill="url(#linear)" d="M41.43,28.49a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.07-2.74-2-4.12l1.64-3.82H51.18L46,21.17s-.9,3,1.79,4.1,3.33-.61,3.33-.61L56.21,8.88s.84-1.9-1.45-3.09l-1.3-.7H86c.74,0,.83-.44.45-1.2L85.18,1.39A1.83,1.83,0,0,0,83.42.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49a2,2,0,0,0,1.93,1.25L22.48,8.91c-1.35-.91-2.11-.49-2.58.88l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44"/>
          </g>
          <g id="Frame19">
            <path fill="url(#linear)" d="M65.31,12.83,50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17s1.05-1.59,1.68-.17S66.17,11.84,65.31,12.83Z"/>
          </g>
          <g id="Frame20">
            <path fill="url(#linear)" d="M67.73,22l3-9.1c.57-1.79-.91-2.76-2.61-3.91s-2.55-.42-4,1.22L51.07,24.81,56.16,9c.51-1.6.18-2.18-.74-2.84l-2-1.06H86c.74,0,.83-.44.45-1.2L85.22,1.39A1.83,1.83,0,0,0,83.46.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49A1.82,1.82,0,0,0,24,5.09h27.2L44.73,25.15a14.51,14.51,0,0,0-.57,2.11,3.44,3.44,0,0,0,0,.51,1.81,1.81,0,0,0,.13.71H41.43a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44h2.83c.24.57.82,1,1.81,1.69,2.19,1.49,2.74,1.83,4.44-.23L65.31,12.83,62,22.61a2.54,2.54,0,0,0,1.85,3.12C66.38,26.59,67.73,22,67.73,22Z"/>
          </g>
          <g id="Frame21">
            <path fill="url(#linear)" d="M74.63,15.51,67.73,22l3-9.1c.57-1.79-.91-2.76-2.61-3.91s-2.55-.42-4,1.22L51.07,24.81,56.16,9c.51-1.6.18-2.18-.74-2.84l-2-1.06H86c.74,0,.83-.44.45-1.2L85.22,1.39A1.83,1.83,0,0,0,83.46.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49A1.82,1.82,0,0,0,24,5.09h27.2L44.73,25.15a14.51,14.51,0,0,0-.57,2.11,3.44,3.44,0,0,0,0,.51,1.81,1.81,0,0,0,.13.71H41.43a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44h2.83c.24.57.82,1,1.81,1.69,2.19,1.49,2.74,1.83,4.44-.23L65.31,12.83l-4.72,14c-.46,1.52-.33,2.07.37,2.55l2.22,1.51c.93.63,1.35.77,2.54-.36L77.44,19.42s3.51-2.67,2.06-4.5C79.5,14.92,78.18,12.18,74.63,15.51Z"/>
          </g>
          <g id="Frame22">
            <path fill="url(#linear)" d="M75.5,24.32l1.94-4.9L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.52,8.94s-.66,1.89-3.44,1.72S75.5,24.32,75.5,24.32Z"/>
          </g>
          <g id="Frame23">
            <path fill="url(#linear)" d="M87.39,22.2l-7.81,8.36c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68,3.72-3.74s1.25-1.3,2.13-.08C88.33,20.17,88.57,20.93,87.39,22.2Z"/>
          </g>
          <g id="Frame24">
            <path fill="url(#linear)" d="M94.75,14.25,79.58,30.56c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68L93.62,9.64a3.5,3.5,0,0,1,4.52-.7s1,.38-.29,1.85S94.75,14.25,94.75,14.25Z"/>
          </g>
          <g id="Frame25">
            <path fill="url(#linear)" d="M94.75,14.25,79.58,30.56c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68L93.62,9.64a3.5,3.5,0,0,1,4.52-.7L100,10.34c1.33,1,1.76,2.23.94,3.63-.34.58-.77,1.29-1.22,2.06,0,0-1.17,1.12-3.18,0S94.75,14.25,94.75,14.25Z"/>
          </g>
          <g id="Frame26">
            <path fill="url(#linear)" d="M91.32,25.66a17.58,17.58,0,0,1,.88-6.19,37.14,37.14,0,0,1,2.54-5.22L79.58,30.56c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68L93.62,9.64a3.5,3.5,0,0,1,4.52-.7L100,10.34c1.33,1,1.76,2.23.94,3.63a54.34,54.34,0,0,0-3,5.47c-1.43,3.32-1.83,5.6-1.25,6.89,0,0,.37,1.2-1.49,1.7S91.39,27,91.32,25.66Z"/>
          </g>
          <g id="Frame27">
            <path fill="url(#linear)" d="M104.66,29.61a11.51,11.51,0,0,1-6.33,2.14,11.14,11.14,0,0,1-2.3-.26c-5.7-1.17-5.23-7.79-3.82-12a37.14,37.14,0,0,1,2.54-5.22L79.58,30.56c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68L93.62,9.64a3.5,3.5,0,0,1,4.52-.7L100,10.34c1.33,1,1.76,2.23.94,3.63a54.34,54.34,0,0,0-3,5.47c-1.91,4.43-2,7-.35,7.87s3.67-.7,5-2.27c0,0,1.06-1.25,2.16,1A3.21,3.21,0,0,1,104.66,29.61Z"/>
          </g>
          <g id="Frame28">
            <path fill="url(#linear)" d="M105.78,19.47A15.54,15.54,0,0,1,102.63,25c-1.34,1.58-3.5,3.09-5,2.27s-1.56-3.43.35-7.87A54.34,54.34,0,0,1,101,14c.82-1.4.39-2.62-.94-3.63L98.15,8.94a3.5,3.5,0,0,0-4.52.7L81.39,22.48l2.06-6.68.55-1.4c.71-2.21-.05-2.63-2.08-4l-.21-.15c-1.35-.91-2-.41-2.47,1L67.73,22l3-9.1c.57-1.79-.91-2.76-2.61-3.91s-2.55-.42-4,1.22L51.07,24.81,56.16,9c.51-1.6.18-2.18-.74-2.84l-2-1.06H86c.74,0,.83-.44.45-1.2L85.22,1.39A1.83,1.83,0,0,0,83.46.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49A1.82,1.82,0,0,0,24,5.09h27.2L44.73,25.15a14.51,14.51,0,0,0-.57,2.11,3.44,3.44,0,0,0,0,.51,1.81,1.81,0,0,0,.13.71H41.43a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44h2.83c.24.57.82,1,1.81,1.69,2.19,1.49,2.74,1.83,4.44-.23L65.31,12.83l-4.72,14c-.46,1.52-.33,2.07.37,2.55l2.22,1.51c.93.63,1.35.77,2.54-.36L77.44,19.42l-3,7.42c-.61,1.9-.35,2.14,1.36,3.3l1.08.73c1,.66,1.71.82,2.71-.32L94.75,14.25a37.14,37.14,0,0,0-2.54,5.22c-1.41,4.24-1.88,10.85,3.82,12a11.14,11.14,0,0,0,2.3.26c6.22-.22,10.26-5.06,12.23-10.24,0,0,.55-1.32-1.94-2.26S105.94,19.19,105.78,19.47Z"/>
          </g>
          <g id="Frame29">
            <path fill="url(#linear)" d="M106.69,14.71a14.28,14.28,0,0,1-.91,4.76A15.54,15.54,0,0,1,102.63,25c-1.34,1.58-3.5,3.09-5,2.27s-1.56-3.43.35-7.87A54.34,54.34,0,0,1,101,14c.82-1.4.39-2.62-.94-3.63L98.15,8.94a3.5,3.5,0,0,0-4.52.7L81.39,22.48l2.06-6.68.55-1.4c.71-2.21-.05-2.63-2.08-4l-.21-.15c-1.35-.91-2-.41-2.47,1L67.73,22l3-9.1c.57-1.79-.91-2.76-2.61-3.91s-2.55-.42-4,1.22L51.07,24.81,56.16,9c.51-1.6.18-2.18-.74-2.84l-2-1.06H86c.74,0,.83-.44.45-1.2L85.22,1.39A1.83,1.83,0,0,0,83.46.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49A1.82,1.82,0,0,0,24,5.09h27.2L44.73,25.15a14.51,14.51,0,0,0-.57,2.11,3.44,3.44,0,0,0,0,.51,1.81,1.81,0,0,0,.13.71H41.43a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44h2.83c.24.57.82,1,1.81,1.69,2.19,1.49,2.74,1.83,4.44-.23L65.31,12.83l-4.72,14c-.46,1.52-.33,2.07.37,2.55l2.22,1.51c.93.63,1.35.77,2.54-.36L77.44,19.42l-3,7.42c-.61,1.9-.35,2.14,1.36,3.3l1.08.73c1,.66,1.71.82,2.71-.32L94.75,14.25a37.14,37.14,0,0,0-2.54,5.22c-1.41,4.24-1.88,10.85,3.82,12a11.14,11.14,0,0,0,2.3.26c8.13-.29,12.54-8.48,13.47-15,0,0,.46-3.53-2.5-3.55C109.29,13.22,106.64,12.92,106.69,14.71Z"/>
          </g>
          <g id="Frame30">
            <path fill="url(#linear)" d="M106.31,9.29a3.89,3.89,0,0,1,2-.57,2.44,2.44,0,0,1,2.21,1c.94,1.1,1.81,2.91,1.22,7-.93,6.5-5.33,14.69-13.47,15a11.14,11.14,0,0,1-2.3-.26c-5.7-1.17-5.23-7.79-3.82-12a37.14,37.14,0,0,1,2.54-5.22L79.58,30.56c-1,1.14-1.68,1-2.71.32l-1.08-.73c-1.71-1.16-2-1.41-1.36-3.3l3-7.42L65.74,30.55c-1.2,1.13-1.61,1-2.54.36L61,29.4c-.71-.48-.83-1-.37-2.55l4.72-14L50.5,29.94c-1.7,2.07-2.26,1.73-4.44.23-1-.68-1.57-1.11-1.81-1.69H41.43A2.57,2.57,0,0,1,40,29.93l-2.64,1.49a2.73,2.73,0,0,1-3,0l-1.55-.64a2.94,2.94,0,0,1-1.7-2.71V25.75c0-1.37,1-1,1.89-.59l2.31,1,.1-13.56L20.13,30c-.92,1.12-1.58,1.68-2.64,1.39a15.3,15.3,0,0,1-1.8-1.15c-2.18-1.49-2.36-1.83-1.33-5L16,20.81,5.19,30.87c-.58.55-.92.86-2,.15L.64,29.27C-.11,28.76-.1,28,.23,27L4.76,13.77,2,11.91c-.71-.48-.5-1,.36-1.46l2.8-1.6A2.11,2.11,0,0,1,7.7,8.8L10,10.35a1.63,1.63,0,0,1,.71,2.26L7.38,22l11.43-9.92L19.9,9.8c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.56,1.81,1.86,4.05L22,19.79,20.7,24.84,33.78,10.43a7.48,7.48,0,0,1,1.54-1.48,2.9,2.9,0,0,1,2.94-.26,17.59,17.59,0,0,1,2.16,1.21c.84.55,1.3,1.28,1.3,3.09l-.13,13.58,0,.72v.46a3.26,3.26,0,0,1-.13.75h2.83a1.81,1.81,0,0,1-.13-.71,3.44,3.44,0,0,1,0-.51,14.51,14.51,0,0,1,.57-2.11L51.16,5.09H24a1.82,1.82,0,0,1-1.77-1.25L21,1.35c-.39-.76-.3-1.21.45-1.22h62a1.83,1.83,0,0,1,1.77,1.26l1.23,2.49c.39.76.3,1.2-.45,1.2H53.45l2,1.06c.92.67,1.25,1.24.74,2.84L51.07,24.81,64.16,10.17c1.4-1.63,2.25-2.37,4-1.22s3.18,2.13,2.61,3.91l-3,9.1L79.24,11.19c.47-1.37,1.12-1.87,2.47-1l.21.15c2,1.38,2.79,1.81,2.08,4l-.55,1.4-2.06,6.68L93.62,9.64a3.5,3.5,0,0,1,4.52-.7L100,10.34c1.33,1,1.76,2.23.94,3.63a54.34,54.34,0,0,0-3,5.47c-1.91,4.43-2,7-.35,7.87s3.67-.7,5-2.27a15.54,15.54,0,0,0,3.15-5.56,15.6,15.6,0,0,0,.91-4.62s-.6-1-1.19-1.86A3,3,0,0,1,106.31,9.29Z"/>
          </g>
          <g id="Frame31">
            <path fill="url(#linear)" d="M41.43,28.49a3.26,3.26,0,0,0,.13-.75v-.46l0-.72L41.72,13c0-1.8-.46-2.53-1.3-3.09a17.59,17.59,0,0,0-2.16-1.21,2.9,2.9,0,0,0-2.94.26,7.48,7.48,0,0,0-1.54,1.48L20.7,24.84,22,19.79,24.45,13c.7-2.24.17-2.67-1.86-4.05l-.21-.15c-1.35-.91-2-.41-2.47,1l-1.09,2.3L7.38,22l3.32-9.4A1.63,1.63,0,0,0,10,10.35L7.7,8.8a2.11,2.11,0,0,0-2.51.05l-2.8,1.6c-.86.48-1.07,1-.36,1.46l2.73,1.85L.23,27c-.33,1-.34,1.79.4,2.29L3.22,31c1.05.71,1.39.4,2-.15L16,20.81l-1.68,4.37c-1,3.2-.85,3.53,1.33,5a15.3,15.3,0,0,0,1.8,1.15c1.06.29,1.73-.27,2.64-1.39L35.48,12.6l-.1,13.56-2.31-1c-.85-.38-1.86-.78-1.89.59v2.31a2.94,2.94,0,0,0,1.7,2.71l1.55.64a2.73,2.73,0,0,0,3,0L40,29.93a2.57,2.57,0,0,0,1.38-1.44h2.83c.24.57.82,1,1.81,1.69,2.19,1.49,2.74,1.83,4.44-.23L65.31,12.83l-4.72,14c-.46,1.52-.33,2.07.37,2.55l2.22,1.51c.93.63,1.35.77,2.54-.36L77.44,19.42l-3,7.42c-.61,1.9-.35,2.14,1.36,3.3l1.08.73c1,.66,1.71.82,2.71-.32L94.75,14.25a37.14,37.14,0,0,0-2.54,5.22c-1.41,4.24-1.88,10.85,3.82,12a11.14,11.14,0,0,0,2.3.26c8.13-.29,12.54-8.48,13.47-15,.59-4.13-.28-5.94-1.22-7a2.44,2.44,0,0,0-2.21-1,3.89,3.89,0,0,0-2,.57l-2.11,1.26c-.86.48-1.07,1-.36,1.46l2.73,1.85c.26.21.13,3.11-.79,5.61A15.54,15.54,0,0,1,102.63,25c-1.34,1.58-3.5,3.09-5,2.27s-1.56-3.43.35-7.87A54.34,54.34,0,0,1,101,14c.82-1.4.39-2.62-.94-3.63L98.15,8.94a3.5,3.5,0,0,0-4.52.7L81.39,22.48l2.06-6.68.55-1.4c.71-2.21-.05-2.63-2.08-4l-.21-.15c-1.35-.91-2-.41-2.47,1L67.73,22l3-9.1c.57-1.79-.91-2.76-2.61-3.91s-2.55-.42-4,1.22L51.07,24.81,56.16,9c.51-1.6.18-2.18-.74-2.84l-2-1.06H86c.74,0,.83-.44.45-1.2L85.22,1.39A1.83,1.83,0,0,0,83.46.14h-62c-.74,0-.83.46-.45,1.22l1.23,2.49A1.82,1.82,0,0,0,24,5.09h27.2L44.73,25.15a14.51,14.51,0,0,0-.57,2.11,3.44,3.44,0,0,0,0,.51,1.81,1.81,0,0,0,.13.71Z"/>
          </g>
        </svg>
      </div>
    );
  }
});

export default UstwoLogoSequence;
