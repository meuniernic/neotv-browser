import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import OpenInNew from "@material-ui/icons/OpenInNew";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";

class ChannelCard extends React.Component {
  static propTypes = {
    // ...prop type definitions here
    variant: PropTypes.oneOf(["simple", "full"]).isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string,
    callback: PropTypes.func,
    media: PropTypes.string
  };

  static defaultProps = {
    variant: "simple"
  };

  constructor(props) {
    super(props);
    this.isSimple = this.isSimple.bind(this);
  }

  isSimple = () => {
    return this.props.variant === "simple";
  };

  render() {
    const { t } = this.props;
    return (
      <Card className={this.props.classes.card} raised>
        <CardActionArea>
          <CardMedia
            className={this.props.classes.media}
            image={this.props.cover}
            title={this.props.title}

          />
          <CardContent className={clsx(this.isSimple() && this.props.classes.hide)}>
            <Typography gutterBottom variant="h5">
              {this.props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={clsx(this.isSimple() && this.props.classes.hide)}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            href={this.props.media}
            className={this.props.classes.actionButton}
            startIcon={<OpenInNew />}
            target="_blank"
          >
            {t("media.launch")}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(function(theme) {
  return {
    hide: {
      display: "none"
    },
    card: {
      width: 280
    },
    media: {
      height: 200
    }
  };
})(withTranslation("translation")(ChannelCard));
