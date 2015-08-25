import reject from 'lodash/collection/reject';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import capitalize from 'lodash/string/capitalize';

import Log from '../_lib/log';
import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';
import tweetCounts from '../flux/tweetCounts';

const _state = Object.assign({
  currentPage: Nulls.page,
  blogCategory: 'all',
  searchQuery: Nulls.searchQuery,
  showNav: false,
  modal: Nulls.modal,
  colours: Nulls.colours,
  takeover: Nulls.takeover,
  caseStudy: Nulls.caseStudy,
  twitterShares: Nulls.twitterShares,
  facebookShares: Nulls.facebookShares
}, window.state);
if(_state.takeover && window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover.seen = true;
}

function applyData(data, type) {
  const changeSet = {};
  let value;
  if (type === 'twitterShares' || type === 'facebookShares') {
    value = formatSocialShareData(data, type);
  } else {
    value = data;
  }
  changeSet[type] = value;
  Object.assign(_state, changeSet);
  Log('Loaded', type, _state[type]);
}
function applyJobDetailData(job) {
  const index = findIndex(_state.jobs, 'shortcode', job.shortcode);
  _state.jobs[index] = job;
  Log('Added job details', job);
}
function applySocialShareCount(data, type) {
  const response = formatSocialShareResponse(data, type);
  const index = findIndex(_state.posts, 'slug', response.slug);
  if (index > -1) {
    const value = formatSocialShareData(data, type);
    _state.posts[index][type] = value;
    Log(`Added ${type}`, value);
  }
}
function formatSocialShareResponse(data, type) {
  let uri;
  let count;
  let slug;
  switch (type) {
    case 'twitterShares':
      uri = data.url;
      count = data.count;
      break;
    case 'facebookShares':
      uri = data.id;
      count = data.shares || (data.id && 0);
      break;
  }
  if (uri) {
    const uriArray = uri.split('/');
    slug = uriArray[uriArray.length-1] || uriArray[uriArray.length-2];
  }
  return {
    url: uri,
    slug: slug,
    count: count
  }
}
function formatSocialShareData(data, type) {
  const response = formatSocialShareResponse(data, type);
  let value = response.count;
  if (type === 'twitterShares') {
    const oldCount = find(tweetCounts, 'slug', response.slug);
    if (oldCount) {
      value += oldCount.count;
    }
  }
  return value;
}

window._state = _state;

export default {
  setPage(newPage, statusCode) {
    const newPageIdArray = newPage.split('/');
    const slug = newPageIdArray[newPageIdArray.length - 1];
    if(_state.page && _state.page.slug !== slug) {
      _state.page = null;
    }
    if(newPage !== 'blog/search-results') {
      _state.searchQuery = null;
    }
    if(newPage !== 'blog/category') {
      _state.blogCategory = 'all';
    }
    if(newPage !== 'blog/post') {
      _state.twitterShares = null;
      _state.facebookShares = null;
    }
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    _state.posts = null;
    _state.modal = null;
    return Promise.resolve(_state);
  },
  loadData(itemsToLoad) {
    itemsToLoad = reject(itemsToLoad, item => {
      return item.cache !== false && ((!item.slug && _state[item.type]) || (_state[item.type] && _state[item.type].slug === item.slug));
    });
    return DataLoader(itemsToLoad, applyData).then(() => _state);
  },
  setBlogCategoryTo(id) {
    _state.blogCategory = id;
    return Promise.resolve(_state);
  },
  setSearchQueryTo(string) {
    _state.searchQuery = string;
    return Promise.resolve(_state);
  },
  showContacts() {
    _state.modal = 'contacts';
    return Promise.resolve(_state);
  },
  openNav() {
    _state.showNav = true;
    return Promise.resolve(_state);
  },
  closeNav() {
    _state.showNav = false;
    return Promise.resolve(_state);
  },
  closeTakeover() {
    if(_state.takeover) {
      window.localStorage.setItem('takeover-'+_state.takeover.id, true);
      _state.takeover.seen = true;
    }
    return Promise.resolve(_state);
  },
  closeModal() {
    _state.modal = Nulls.modal;
    return Promise.resolve(_state);
  },
  getJobDetails(jid) {
    let promise;
    const job = find(_state.jobs, 'shortcode', jid);
    if(job.description) {
      promise = Promise.resolve(_state);
    } else {
     promise = DataLoader([{
        url: `ustwo/v1/jobs/${jid}`,
        type: 'job'
      }], applyJobDetailData).then(() => _state);
    }
    return promise;
  },
  showSearch() {
    _state.modal = 'search';
    return Promise.resolve(_state);
  },
  showBlogCategories() {
    _state.modal = 'blogCategories';
    return Promise.resolve(_state);
  },
  getSocialSharesForPosts() {
    return Promise.all(_state.posts.map(post => {
      let promise;
      if (post.slug) {
        const uri = `http://ustwo.com/blog/${post.slug}`;
        const httpsUri = `https://ustwo.com/blog/${post.slug}`;
        promise = DataLoader([{
          url: `twitter/count?url=${httpsUri}`,
          external: 'twitter',
          type: 'twitterShares',
          failure: response => console.log('Failed to fetch Twitter share count', response)
        // }, {
          // url: `https://graph.facebook.com/?id=${uri}`,
          // external: 'facebook',
          // type: 'facebookShares',
          // failure: response => console.log('Failed to fetch Facebook share count', response)
        }], applySocialShareCount).then(() => _state);
      } else {
        promise = Promise.resolve(_state);
      }
      return promise;
    })).then(() => _state);
  }
};
