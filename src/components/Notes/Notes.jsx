import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionAdd from 'material-ui/svg-icons/content/add';
import Note from './Note/Note';


class Notes extends Component{
	state = {
		noteLists: [
			{title: "Note A", content: "this is first note"},
			{title: "Note B", content: "this is second note"},
			{title: "Note C", content: "this is third note"},
			{title: "Note D", content: "this is fourth note"}
		],
		open: false,
		noteTitle: '',
		noteContent: ''
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	handleSubmit = ()=>{
		console.log("i am clicked");
		console.log("title", this.state.noteTitle)
		console.log("content", this.state.noteContent)
		let notesArray = [...this.state.noteLists, {title: this.state.noteTitle, content: this.state.noteContent}]
		const	url = "http://localhost:5000/noteApp/api/v1.0/notes"
		axios({
			method: "post",
			url: url,
			data: {
				title: this.state.noteTitle,
				description: this.state.noteContent

			}
		})
		.then(res=>{
		 console.log(res );
 			this.setState({noteLists: notesArray})
		  })

		this.handleClose();

		console.log("notesArray",notesArray)


	};

	handleDelete = (noteIndex)=>{
		let notesArray = [...this.state.noteLists]
		notesArray.splice(noteIndex, 1)
		const noteId = parseInt(noteIndex,10) + 1
		const url = "http://localhost:5000/noteApp/api/v1.0/notes/"+ noteId
		axios({
			method: 'delete',
			url: url,
		})
		 .then(res=>{
			 this.setState({noteLists: notesArray})
		 	console.log(res);
		 })
		console.log("notesarray", notesArray)
		console.log("Delete function called", noteIndex)
	};

	titleChangeHandler = (event)=>{
		this.setState({noteTitle: event.target.value})
	};
	contentChangeHandler = (event)=>{
		this.setState({noteContent: event.target.value})
	};

	render(){
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onClick={this.handleClose}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        onClick={this.handleSubmit}
	      />,
	    ];
		const noteList = this.state.noteLists.map((note,index)=>{
			return(
				<Note
				 title={note.title}
				 content={note.content}
				 delete={()=>this.handleDelete(index)}
				 key={index}
				 />
			)
		})
		return(
			<div>
				<IconButton onClick={this.handleOpen} >
      				<ActionAdd />
    			</IconButton>

    			<Dialog
		          title="Create new Note"
		          actions={actions}
		          modal={true}
		          open={this.state.open}
		        >
		        	<TextField
		        	 hintText="Enter Note Title"
		        	 onChange={this.titleChangeHandler}
		        	 fullWidth={true}
		        	/>
		        	<TextField
				      hintText="Enter Note Content"
				      onChange={this.contentChangeHandler}
				      multiLine={true}
				      fullWidth={true}
				      rows={3}
				      rowsMax={6}
				    />
		        </Dialog>

			    {noteList}
			</div>
		)
	}
};
export default Notes;
