import { Button, Container, Grid } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import "firebase/database";
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar';

export default function CreateRecipe() {
    const { currentUser } = useContext(AuthenticationContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        time: '',
        ingreedientsList: '',
        cookingInstructions: ''
    });
    const history = useHistory();

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Check if the user is registered
        if (currentUser) {
            const db = firebase.database().ref("recipes");
            db.push({ ...formData, userId: currentUser.uid });

            setFormData({
                ...formData,
                title: '',
                description: '',
                time: '',
                ingreedientsList: '',
                cookingInstructions: ''
            });
            history.push('/profile');
            enqueueSnackbar(
                "Publish successful!", {
                preventDuplicate: true,
                variant: "success"
            });
        } else {
            enqueueSnackbar(
                "Please login to your account", {
                preventDuplicate: true,
                variant: "info"
            });
        }
    }

    return (
        <>
            <NavigationBar />
            <Container component="form" onSubmit={handleSubmit}>
                <CssBaseline />
                <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12} style={{ margin: 15 }}>
                        <Typography component='h1' variant='h5'>
                            Create a new Recipe
                        </Typography>
                    </Grid>
                    {/* Dish info */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Title"
                                    onChange={handleChange}
                                    value={formData.title}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Dish Description"
                                    multiline
                                    rowsMax={15}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.description}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="time"
                                    name="time"
                                    label="Time needed"
                                    onChange={handleChange}
                                    value={formData.time}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="ingreedientsList"
                                    name="ingreedientsList"
                                    label="Ingreedients List"
                                    multiline
                                    rowsMax={10}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.ingreedientsList}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="cookingInstructions"
                                    name="cookingInstructions"
                                    label="Cooking instructions"
                                    multiline
                                    rowsMax={10}
                                    rows={10}
                                    onChange={handleChange}
                                    value={formData.cookingInstructions}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Upload img and video */}
                    <Grid item container xs={12} md={6} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="cookingInstructions"
                                name="cookingInstructions"
                                label="Cooking instructions"
                                multiline
                                rowsMax={10}
                                rows={10}

                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="cookingInstructions"
                                name="cookingInstructions"
                                label="Cooking instructions"
                                multiline
                                rowsMax={10}
                                rows={10}

                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="cookingInstructions"
                                name="cookingInstructions"
                                label="Cooking instructions"
                                multiline
                                rowsMax={10}
                                rows={10}

                            // onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Submit Button  */}
                    <Grid item container xs={12}>
                        <Button
                            style={{ marginBottom: 5 }}
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                        >
                            Publish Recipe
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}