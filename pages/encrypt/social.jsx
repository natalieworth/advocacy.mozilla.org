var React = require(`react`);
var Footer = require(`../../components/footer.jsx`);
var EncryptVideo = require(`../../components/encrypt-video.jsx`);
var Signup = require(`../../components/encrypt-signup.jsx`);
var ShareThisNow = require(`../../components/encrypt-share-this-now`);
var EncryptHeader = require(`../../components/encrypt-header`);
var Modal = require(`../../components/encrypt-modal.jsx`);
var classNames = require('classnames');
var Icon = require(`../../components/footer-icon.jsx`);
var VideoData = require(`../../data/encryptVideos.js`);
var Playlist = require(`../../components/encrypt-video-playlist.jsx`);
var Link = require('react-router').Link;
var Router = require('react-router').Router;
var Route = require('react-router').Route;



module.exports = React.createClass({
  getInitialState: function() {
    return {
      formIsVisible: false,
      didSignUp: false,
      videoDidStart: false,
      videoDidEnd: false,
      videoIsPaused: false
    };
  },
  componentWillMount() {
    this.videoOptions = VideoData;
  },
  changeVideo(video){
    var didSignup = this.state.didSignup;
    this.setState(this.getInitialState());
    this.setState({didSignup: didSignup});
  },
  setPageState(state){
    this.setState(state);
  },
  showModal: function(e) {
    e.preventDefault();
    this.setState({
      formIsVisible: true
    });
  },
  hideModal: function() {
    this.setState({
      formIsVisible: false,
      videoDidEnd: false,
      videoDidStart: false
    });
  },
  userDidSignup: function() {
    this.setState({
      didSignup: true
    });
    setTimeout(this.hideModal, 2000);
  },
  render: function() {
    var modalClass = classNames({
      'join-modal': true
    });
    return (
      <div className="encrypt v2">
      <EncryptHeader videoDidStart={this.state.videoDidStart} showModal={this.showModal}/>
        <main>
          <EncryptVideo
              pageVersion="2"
              videoType="direct"
              video={this.videoOptions[this.props.params.video-1]}
              setPageState={this.setPageState}
              videoDidEnd={this.state.videoDidEnd}
              videoDidStart={this.state.videoDidStart}
              videoIsPaused={this.state.videoIsPaused}
              activeVideo={this.props.params.video-1}
            />
            <Playlist videoDidStart={this.state.videoDidStart} videos={this.videoOptions} activeVideo={this.props.params.video-1} changeVideo={this.changeVideo} pageType="social"/>
          <div className="dual-cta-wrapper">
            <div className="join-mozilla-wrapper">
              <div className="join-mozilla cta">
                <h2>
                 Join Mozilla
                </h2>
                <div className="horizontal-rule"></div>
                <p>
                  For more resources and videos about encryption and other topics essential to protecting the Web, sign up for email updates from Mozilla.
                </p>
                {!this.state.didSignup ? <button onClick={this.showModal} className="button">Sign up</button> : 'Thank you!'}
              </div>
            </div>
            <ShareThisNow/>
          </div>
        </main>
        <Footer>
          <Icon href="https://medium.com/encryption-matters" src="/assets/footer-icon-medium.svg" title="Medium">Join the Conversation</Icon>
        </Footer>
        { this.state.formIsVisible ?
          <Modal className="join-modal" hideModal={this.hideModal}>
            <div className="cta">
              <h2 aria-role="label">Join the email list</h2>
              <div className="horizontal-rule"></div>
              <Signup submitButtonText="Subscribe" onSubmission={this.userDidSignup}/>
            </div>
          </Modal>
          : '' }
	{this.state.videoDidEnd ? <Modal hideModal={this.hideModal} className="postVideo signup-cta">
	  <p className="cta-title">Stand with us for a free and open Internet.<br/>Sign on.</p>
	  <Signup />
	</Modal> : ''}
      </div>
    );
  }
});