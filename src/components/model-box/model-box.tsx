import React from 'react';
import { Modal, Box, TextField, Grid, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFirebase } from 'src/Context/FirebaseContext';

interface ModelBoxProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: FormData) => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    department: string;
    position: string;
    notes: string;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
};

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    country: Yup.string().required('Country is required'),
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required'),
    notes: Yup.string(),
});

const ModelBox: React.FC<ModelBoxProps> = ({ open, onClose, onSubmit }) => {
    const { addUser } = useFirebase();

    const formik = useFormik<FormData>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            department: '',
            position: '',
            notes: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (onSubmit) {
                    onSubmit(values);
                }

                await addUser(values);

                toast.success('Form submitted successfully!', {
                    position: 'top-right',
                });

                // Clear the form and close modal
                formik.resetForm();
                onClose();
            } catch (error) {
                // Display error toast
                toast.error('Failed to submit the form. Please try again!', {
                    position: 'top-right',
                });
                console.error('Error submitting form data:', error);
            }
        },
    });

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-form-title">
            <Box sx={modalStyle} component="form" onSubmit={formik.handleSubmit}>
                <Typography id="modal-form-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    12 Field Form
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="zipCode"
                            label="Zip Code"
                            value={formik.values.zipCode}
                            onChange={formik.handleChange}
                            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                            helperText={formik.touched.zipCode && formik.errors.zipCode}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="country"
                            label="Country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="department"
                            label="Department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                            helperText={formik.touched.department && formik.errors.department}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="position"
                            label="Position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={formik.touched.position && Boolean(formik.errors.position)}
                            helperText={formik.touched.position && formik.errors.position}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="notes"
                            label="Additional Notes"
                            multiline
                            rows={4}
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ModelBox;
