import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../../styles';
import styled from 'styled-components';
import PlaylistBox from '../PlaylistBox';
import PlaylistDetailScreen from './PlaylistDetailScreen';

interface Playlist {
  playlistName: string;
  playlistId: number;
  photo: string;
  rating: object;
  songs: Array<any>;
}

export default function AuthScreen(): JSX.Element {
  const playlistList: object[] = [];
  let redirectProps: any[];
  // const [playlistData, setPlaylistData] = useState(Array<any>());
  const [playlistBoxList, setPlaylistBoxList] = useState(Array<any>());
  const history = useHistory();
  // const [goToPlaylist, setGoToPlaylist] = useState(null);

  const classes = useStyles();
  //declare playlists array
  const routes: Array<any> = [];
  //fetch req to endpoint

  function renderPlaylistDetailScreen(id: number) {
    console.log('id', id);
    console.log('playlistList', playlistList);
    redirectProps = playlistList.filter((ele: any) => {
      console.log('ele.playlistId', ele.playlistId, 'id', id);
      console.log(
        'typeof ele.playlistId',
        typeof ele.playlistId,
        'typeof id',
        typeof id
      );
      return ele.playlistId === id;
    });
    console.log('redirectProps', redirectProps);
    // setGoToPlaylist(redirectProps);
    // let history = useHistory();
    history.push('/playlistdetails', {
      playlistName: redirectProps[0].playlistName,
      playlistId: redirectProps[0].playlistId,
      photo: redirectProps[0].photo,
      rating: redirectProps[0].rating,
      songs: redirectProps[0].songs,
    });
    // return (
    //   <Redirect
    //     to={{
    //       pathname: `/playlistdetails`,
    //       state: {
    //         playlistName: redirectProps.playlistName,
    //         playlistId: redirectProps.playlistId,
    //         photo: redirectProps.photo,
    //         rating: redirectProps.rating,
    //         songs: redirectProps.songs,
    //       },
    //     }}
    //   ></Redirect>
    // );
  }

  function getPlaylist() {
    console.log('getPlaylist', Date.now());
    fetch('http://localhost:3000/playlist', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        let counter = 0;
        const playlistBoxList: Array<any> = [];
        console.log(
          '🚀 | file: HomeScreen.tsx | line 56 | getPlaylist | data.playlist',
          data.playlist
        );
        for (let curPlaylist in data.playlist) {
          console.log('loop iteration');
          let ele = data.playlist[curPlaylist];
          const playlistObj: Playlist = {
            playlistName: ele.name,
            playlistId: counter,
            photo: ele.photo
              ? ele.photo.url
              : 'https://www.sleek-mag.com/wp-content/uploads/2016/08/AlbumCovers_Blonde.jpg',
            rating: ele.rating,
            songs: ele.songs,
          };
          playlistList.push(playlistObj);
          console.log(
            '🚀 | file: HomeScreen.tsx | line 67 | getPlaylist | playlistList',
            playlistList
          );
          playlistBoxList.push(
            <PlaylistBox
              // /*onClick={(e:any)=> <Redirect to = {{pathname: `/${e.target.id}`}}/> }*/
              id={counter++}
              redirect={renderPlaylistDetailScreen}
              playlistName={playlistObj.playlistName}
              playlistId={playlistObj.playlistId}
              photo={playlistObj.photo}
            />
          );
          console.log(
            '🚀 | file: HomeScreen.tsx | line 68 | getPlaylist | playlistBoxList',
            playlistBoxList
          );
        }
        setPlaylistBoxList(playlistBoxList);
        // playlistList.forEach((ele: any) => {
        //   routes.push(
        //     <Route path={`/${ele.playlistId}`}>
        //       <PlaylistDetailScreen
        //         playlistName={ele.playlistName}
        //         playlistId={ele.id}
        //         photo={ele.photo}
        //         rating={ele.rating}
        //         songs={ele.songs}
        //       />
        //     </Route>
        //   );
        // });
      });
  }

  //push new playlist component to playlists array passing in name, playlist id, and cover photo
  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Scorify
          </Typography>
          <Button onClick={getPlaylist} color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <HomePage>
        <div
          style={{ justifyContent: 'space-evenly' }}
          className={classes.mainPane}
        >
          {playlistBoxList}
        </div>
      </HomePage>
      {/* <div>
        <Router>
          <Switch>
            <Route
              path="/playlistdetails"
              render={(props) => <PlaylistDetailScreen {...props} />}
            ></Route>
          </Switch>
        </Router>
      </div> */}
    </>
  );
}
const HomePage = styled.div`
  width: 100%;
  height: 100%;
`;
