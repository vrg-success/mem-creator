import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { client } from 'graphQLClient/index'
import Pagination from './Components/Pagination/Pagination';
import { openEditor } from 'store/actions/editor';
import { connect } from 'react-redux';
import './sliderImages.sass';


const mapDispatchToProps = dispatch => ({
  openEditor: imageUrl => dispatch(openEditor(imageUrl))
});


class SliderImages extends Component {
  static propTypes = {
    openEditor: propTypes.func
  };

  state = {
    currentPage: 0,
    memes: [],
    loader: false
  }

  componentDidMount() {
    this.setState({
      loader: true
    });

    client.request(`
      {
        memLists (orderBy: order_ASC) {
          id,
          image {
            url
          },
          imageAlt
        }
      }
    `).then(data => {
      let sortedArray = [];
      const chunksCount = Math.ceil(data.memLists.length / 6);

      for (let i = 0; i < chunksCount; i++) {
        sortedArray.push(data.memLists.slice(i * 6, i * 6 + 6));
      }

      this.setState({
        memes: sortedArray,
        loader: false
      });
    });
  }

  handleClick = imageUrl => {
    this.props.openEditor(imageUrl);
  }

  handleChangePage = page => {
    this.setState({
      currentPage: page
    });
  }

  renderMemes = () => {
    if (this.state.memes.length) {
      return (
        this.state.memes[this.state.currentPage].map(item => {
          return (
            <li className="memes__item" key={item.id}>
              <button
                style={{ backgroundImage: `url(${item.image.url})` }}
                title={item.imageAlt}
                onClick={() => this.handleClick(item.image.url)}
              />
            </li>
          )
        })
      );
    }
    return null;
  }

  render() {
    return (
      <section className="memes">
        {!this.state.loader ? (
          <Fragment>
            <ul className="memes__list">{this.renderMemes()}</ul>
            <Pagination
              countPages={this.state.memes.length}
              currentPage={this.state.currentPage}
              handleChangePage={this.handleChangePage}
            />
          </Fragment>
        ) : (
          <img src="img/loader.svg" alt="loader" className="loader" />
        )}
      </section>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SliderImages);