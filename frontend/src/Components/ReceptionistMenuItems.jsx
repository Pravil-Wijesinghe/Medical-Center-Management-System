export const ReceptionistMenuItems = [
    {
        title: 'Dashboard',
        url: '/ReceptionistDashboard',
        cName: 'nav-links'
    },
    {
        title: 'Patients',
        url: '#',
        cName: 'nav-links',
        subMenu: [
            { title: 'Add a Patient', url: '/ReceptionistAddPatient' },
            { title: 'View Patients', url: '/ReceptionistViewPatientst' } 
        ]
    },
    {
        title: 'Doctors',
        url: '#',
        cName: 'nav-links',
        subMenu: [
            { title: 'Add a Doctor', url: '/ReceptionistAddDoctor' },
            { title: 'View Doctors', url: '/ReceptionistViewDoctors' },
            { title: 'Payments', url: '/ReceptionistDoctorPayments' }
        ]
    },
    {
        title: 'Inventory',
        url: '#',
        cName: 'nav-links',
        subMenu: [
            { title: 'Add a Medicine', url: '/ReceptionistAddMedicine' },
            { title: 'View Medicines', url: '/ReceptionistViewMedicines' }
        ]
    },
    {
        title: 'Appointments',
        url: '#',
        cName: 'nav-links',
        subMenu: [
            { title: 'Make An Appointment', url: '/ReceptionistMakeAppointment' },
            { title: 'View Appointments', url: '/ReceptionistViewAppointments' }
        ]
    },
    {
        title: 'Logout',
        url: '/ReceptionistLogout',
        cName: 'nav-links'
    }
]
