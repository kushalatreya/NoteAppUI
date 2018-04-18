import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ActionDelete from 'material-ui/svg-icons/action/delete';


import './Note.css';

const Note = (props)=>{
	return(
		<div>
			<Paper className="note-app" zDepth={3} >
				<IconButton onClick={props.delete}>
					<ActionDelete />
				</IconButton>
		    	<Subheader className="sub-header">{props.title}</Subheader>
		    	<p>
		    		{props.content}
		    	</p>
		    </Paper>
		</div>
	)
}

export default Note;