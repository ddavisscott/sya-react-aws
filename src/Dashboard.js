import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from './CardMedia';
import {Storage} from 'aws-amplify';


class Dashboard extends Component {

    state = {
        keys: []
    }

    componentWillMount(){
        Storage.list('', {
            bucket: 'myapp-20181030214040-deployment'
          })
          .then(result => this.setState({keys:result}))
          .catch(err => console.log(err));
    }

    render() {
        return(
            <Grid container spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="flex-start" spacing={Number(16)}>
                {this.state.keys.map(value => (
                  <Grid key={value.key} item>
                    <CardMedia title={value.key}
                               src={"https://s3.amazonaws.com/myapp-20181030214040-deployment/public/" + value.key} 
                               />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) 
    }

}

export default Dashboard;