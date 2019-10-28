import React from 'react';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 250,
  },
  media: {
    height: 150,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          image={props.imageUrl}
          title={props.imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.cardText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button size="small"  variant="contained" color="primary"  href={props.link} className={classes.actionButton} startIcon={<OpenInNew />} target="_blank">
          {t("media.launch")}
        </Button>
      </CardActions>
    </Card>
  );
}