import firebase from 'components/Firebase/firebase';
import { withRouter } from "react-router";

function RedirectC(props) {
    //console.log(props.match.params.shortenedId);
    let sId = props.match.params.shortenedId
    if (sId) {
        redirectWithShortenedId(sId)
    }

    function redirectWithShortenedId(sId) {
        firebase.database().ref('shortenedURLS/' + sId + "/clicks").push(Date.now());
        for (let i = 0; i < 1000; i++)
        {
            firebase.database().ref('totalClicks').push(Date.now());

        }
        firebase.database().ref('shortenedURLS/' + sId).once('value').then((snap) => {
            if (snap.exists()) {
                let item = snap.val();
                //console.log(item);
                return window.location.href = item.originalURL;
            }
            else {
                return;
            }

        });
    }
    return null;
}

export default withRouter(RedirectC);