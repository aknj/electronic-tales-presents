import React from "react";
import i18next from "i18next";
import Fade from "react-reveal/Fade";

import withAPITranslation from "../../../elements/HOC/withAPITranslation";

import * as Utils from "../../../utils/Utils";

import modernWorld from "../../../resources/img/modern-world-animation-pretty-ok.gif";
import ancientWorld from "../../../resources/img/ancient-world-animation-pretty-ok.gif";
import imaginarium from "../../../resources/img/imaginarium-animation.gif";

import "./TracksTabs.css";

class TracksTabs extends React.Component {
  state = {
    isShown: false,
    isTranslated: false,
    isActive: ["modern-world"],
    worlds: [],
  };

  componentDidMount() {
    // passes the immplementation of generate method to i18next HOC
    this.props.implementGenerate(this.generate);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isShown !== prevProps.isShown) {
      this.setState({ isShown: this.props.isShown });
    }
    if (this.props.isTranslated !== prevProps.isTranslated) {
      this.setState({ isTranslated: this.props.isTranslated });
    }
  }

  generate = () => {
    this.setState({
      worlds: [
        {
          id: "modern-world",
          title: "Modern World",
          desc: i18next.t("tracks.tracksTabs.worlds.id1.text"),
          descMobile: i18next.t("tracks.tracksTabs.worlds.id1.textMobile"),
          baseline: i18next.t("tracks.tracksTabs.worlds.id1.baseline"),
          imgSrc: modernWorld,
          imgAlt: "modern world gif",
        },
        {
          id: "ancient-world",
          title: "Ancient World",
          desc: i18next.t("tracks.tracksTabs.worlds.id2.text"),
          descMobile: i18next.t("tracks.tracksTabs.worlds.id2.textMobile"),
          baseline: i18next.t("tracks.tracksTabs.worlds.id2.baseline"),
          imgSrc: ancientWorld,
          imgAlt: "ancient world gif",
        },
        {
          id: "imaginarium",
          title: "Imaginarium",
          desc: i18next.t("tracks.tracksTabs.worlds.id3.text"),
          descMobile: i18next.t("tracks.tracksTabs.worlds.id3.textMobile"),
          baseline: i18next.t("tracks.tracksTabs.worlds.id3.baseline"),
          imgSrc: imaginarium,
          imgAlt: "imaginarium gif",
        },
      ],
    });
  };

  show = (worldId) => {
    this.setState({ isActive: [worldId] });
  };

  shouldIShow = (worldId) => {
    return this.state.isActive.includes(worldId) ? true : false;
  };

  render() {
    if (this.props.mobile) {
      return (
        <div id="worlds-container">
          <div id="world">
            {this.state.worlds.map((world) => (
              <div
                key={world.id}
                id={world.id + "-container"}
                className="world-container"
              >
                <div id="tabs">
                  <div className="tab-title neon-flicker">
                    <Fade cascade duration={2000}>
                      {world.title}
                    </Fade>
                  </div>
                </div>
                <div className="content-container" id={world.id}>
                  <img src={world.imgSrc} alt={world.alt} />
                  <div className="text-container">
                    <p
                      dangerouslySetInnerHTML={Utils.convertToCleanHtml(
                        world.descMobile
                      )}
                    ></p>
                    <Fade duration={2000}>
                      <p className="baseline">{world.baseline}</p>
                    </Fade>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div id="worlds-container">
          <div id="world">
            <div>
              <div id="tabs">
                {this.state.worlds.map((world) => (
                  <div
                    id={world.id}
                    key={world.id}
                    className="tab-title"
                    onClick={() => this.show(world.id)}
                    style={{
                      textShadow: this.shouldIShow(world.id)
                        ? "0 0 0.4em rgb(0, 225, 255), 0 0 0.8em rgb(0, 225, 255), 0 0 1.6em rgb(0, 255, 255)"
                        : "none",
                    }}
                  >
                    {world.title}
                  </div>
                ))}
              </div>
            </div>

            {this.state.worlds.map((world) => (
              <div key={world.id}>
                <div
                  className="content-container"
                  id={world.id}
                  style={{
                    display: this.shouldIShow(world.id) ? "" : "none",
                  }}
                >
                  <img src={world.imgSrc} alt={world.alt} />
                  <div className="text-container">
                    <p
                      dangerouslySetInnerHTML={Utils.convertToCleanHtml(
                        world.desc
                      )}
                    ></p>
                    <p className="baseline">{world.baseline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default withAPITranslation(TracksTabs);
