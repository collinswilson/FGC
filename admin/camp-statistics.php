<?php
  session_start();
  $firstname = $_SESSION['firstname'];
  $lastname = $_SESSION['lastname'];
  $email = $_SESSION['email'];
  $firstnameFirst = substr($firstname, 0, 1);
  $lastnameFirst = substr($lastname, 0, 1);

  $campId = $_GET['id'];
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Camp list</title>

    <link rel="icon" href="../img/fsLogo.jpeg" type="image/x-icon" />

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <link href="css/pagination.css" rel="stylesheet" type="text/css">

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">FS Admin <sup>YC</sup></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link" href="dashboard.php">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Admin & Camp Management
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-user"></i>
                    <span>Admin</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Admin Section:</h6>
                        <a class="collapse-item" href="create-admin.php">Create new</a>
                        <a class="collapse-item" href="admin-list.php">Admin list</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Utilities Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-angle-up"></i>
                    <span>Camp</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Camp Section:</h6>
                        <a class="collapse-item" href="create-camp.php">Create new</a>
                        <a class="collapse-item" href="camp-list.php">Camp list</a>
                    </div>
                </div>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                User Management
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-user"></i>
                    <span>Users</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Users Section:</h6>
                        <a class="collapse-item" href="user-list.php">Users List</a>
                        <a class="collapse-item" href="scan-code.php">Scan Code</a>
                    </div>
                </div>
            </li>

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php echo $firstname.' '.$lastname ?></span>
                                <img class="img-profile rounded-circle"
                                    src="img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a class="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">Camp Statistics</h1>

                    <div class="card p-5">
                        <h6>Sort List by: </h6>
                        
                        <div class="row">
                            <div style="display: none" id="campIdHolder"><?php echo $campId ?></div>

                            <div class="col-sm-12 col-md-2">                                    
                                <div class="form-group">
                                    <label for="district" class="text-primary">District</label>
                                    <select class="browser-default custom-select form-control form-control-user" id="district">
                                        <option value="" selected>Choose answer</option>
                                        <option value="Agege (Agege)">Agege (Agege)</option>
                                        <option value="Akowonjo (Agege)">Akowonjo (Agege)</option>
                                        <option value="Akute (Ikeja)">Akute (Ikeja)</option>
                                        <option value="Alaka  (Yaba)">Alaka (Yaba)</option>
                                        <option value="Alapere (Somolu)">Alapere (Somolu)</option>
                                        <option value="Badagry (Badagry)">Badagry (Badagry)</option>
                                        <option value="Egbe (Festac)">Egbe (Festac)</option>
                                        <option value="Festac (Festac)">Festac (Festac)</option>
                                        <option value="Iba (Badagry)">Iba (Badagry)</option>
                                        <option value="Ifako (Ikeja)">Ifako (Ikeja)</option>
                                        <option value="Ikeja (Ikeja)">Ikeja  (Ikeja)</option>
                                        <option value="Ikorodu1 (Ikorodu)">Ikorodu1 (Ikorodu)</option>
                                        <option value="Ikorodu2 (Ikorodu)">Ikorodu2 (Ikorodu)</option>
                                        <option value="ketu (Somolu)">ketu (Somolu)</option>
                                        <option value="Lagos Island (Lekki)">Lagos Island (Lekki)</option>
                                        <option value="Lekki (Lekki)">Lekki (Lekki)</option>
                                        <option value="Life Seminary (Ikorodu)">Life Seminary (Ikorodu)</option>
                                        <option value="Nathq (Yaba)">Nathq (Yaba)</option>
                                        <option value="Oshodi (Agege)">Oshodi (Agege)</option>
                                        <option value="Somolu (Somolu)">Somolu (Somolu)</option>
                                        <option value="Surulere (Yaba)">Surulere (Yaba)</option>
                                        <option value="Magodo (Ikeja)">Magodo (Ikeja)</option>
                                        <option value="Baruwa (Agege)">Baruwa (Agege)</option>
                                        <option value="Agbado (Agege)">Agbado (Agege)</option>
                                        <option value="Epe (Lekki)">Epe (Lekki)</option>
                                        <option value="Ajegunle/Apapa (Yaba)">Ajegunle/Apapa (Yaba)</option>
                                        <option value="Owutu (Ikorodu)">Owutu (Ikorodu)</option>
                                        <option value="Ipakodo (Ikorodu)">Ipakodo (Ikorodu)</option>
                                        <option value="Saabo (Ikeja)">Saabo (Ikeja)</option>
                                        <option value="Oregun (Ikeja)">Oregun (Ikeja)</option>
                                        <option value="Jakande Estate (Festac)">Jakande Estate (Festac)</option>
                                        <option value="Morogbo (Badagry)">Morogbo (Badagry)</option>
                                        <option value="Alake Dist (Agege)">Alake Dist (Agege)</option>
                                        <option value="Ajah Dist (Lekki)">Ajah Dist (Lekki)</option>
                                        <option value="Gbagada (Somolu)">Gbagada (Somolu)</option>
                                        <option value="Vgc (Lekki)">Vgc (Lekki)</option>
                                        <option value="Ibafo (Ikeja)">Ibafo (Ikeja)</option>
                                        <option value="Mushin (Somolu)">Mushin (Somolu)</option>
                                        <option value="Sabo Oniba (Badagry)">Sabo Oniba (Badagry)</option>
                                        <option value="Igbogbo (Ikorodu)">Igbogbo (Ikorodu)</option>
                                        <option value="Ogijo (Ikorodu)">Ogijo (Ikorodu)</option>
                                        <option value="Abesan (Agege)">Abesan (Agege)</option>
                                        <option value="Iju Ishaga (Ikeja)">Iju Ishaga (Ikeja)</option>
                                        <option value="Apeka (Ikorodu)">Apeka (Ikorodu)</option>
                                        <option value="Benin1 (Mid-West)">Benin1 (Mid-West)</option>
                                        <option value="Asaba (Mid-West)">Asaba (Mid-West)</option>
                                        <option value="Effurun (Mid-West)">Effurun (Mid-West)</option>
                                        <option value="Auchi (Mid-West)">Auchi (Mid-West)</option>
                                        <option value="Ekpoma (Mid-West)">Ekpoma (Mid-West)</option>
                                        <option value="Ogbe Benin2 (Mid-West)">Ogbe Benin2 (Mid-West)</option>
                                        <option value="Dst District (Mid-West)">Dst District (Mid-West)</option>
                                        <option value="Ughelli District (Mid-West)">Ughelli District (Mid-West)</option>
                                        <option value="Ubeji (Mid-West)">Ubeji (Mid-West)</option>
                                        <option value="Ekpan (Mid-West)">Ekpan (Mid-West)</option>
                                        <option value="Abuja (Abuja)">Abuja (Abuja)</option>
                                        <option value="Jos (North Central )">Jos (North Central )</option>
                                        <option value="Lokoja (North Central )">Lokoja (North Central )</option>
                                        <option value="Makurdi (North Central )">Makurdi (North Central )</option>
                                        <option value="Minna (North Central )">Minna (North Central )</option>
                                        <option value="Lafia (North Central )">Lafia (North Central )</option>
                                        <option value="Kontagora  (North Central)">Kontagora (North Central)</option>
                                        <option value="Wuse (Abuja )">Wuse (Ajuja)</option>
                                        <option value="Kubwa (Abuja )">Kubwa (Abuja)</option>
                                        <option value="Katsina-Ala (North Central )">Katsina- Ala (North Central)</option>
                                        <option value="Otukpo (North Central )">Otukpo (North Central)</option>
                                        <option value="Idah (North Central )">Idah (North Central)</option>
                                        <option value="Okenne (North Central )">Okenne (North Central)</option>
                                        <option value="Akwanga (North Central )">Akwanga (North Central)</option>
                                        <option value="Addo (North Central )">Addo (North Central)</option>
                                        <option value="Suleja (Abuja )">Suleja (Abuja)</option>
                                        <option value="Bida (North Central )">Bida (North Central)</option>
                                        <option value="Shendam (North Central )">Shendam (North Central)</option>
                                        <option value="Pankshin (North Central )">Pankshin (North Central)</option>
                                        <option value="Anyigba (North Central )">Anyigba (North Central)</option>
                                        <option value="Nyanya (Abuja )">Nyanya (Abuja)</option>
                                        <option value="Galadima Kogo (North Central )">Galadima Kogo (North Central)</option>
                                        <option value="Abocho (North Central )">Abocho (North Central)</option>
                                        <option value="Dafa (Abuja )">Dafa (Abuja)</option>
                                        <option value="Bauchi (North East )">Bauchi (North East)</option>
                                        <option value="Damaturu (North East )">Damaturu (North East)</option>
                                        <option value="Gombe (North East )">Gombe (North East)</option>
                                        <option value="Jalingo (North East )">Jalingo (North East)</option>
                                        <option value="Maiduguri (North East )">Maiduguri (North East)</option>
                                        <option value="Yola (North East )">Yola (North East)</option>
                                        <option value="Mubi (North East )">Mubi (North East)</option>
                                        <option value="Numan (North East )">Numan (North East)</option>
                                        <option value="Bali (North East )">Bali (North East)</option>
                                        <option value="Ussa (North East )">Ussa (North East)</option>
                                        <option value="Birnin-Kebbi (North West )">Birnin-Kebbi (North West)</option>
                                        <option value="Dutse (North West )">Dutse (North West)</option>
                                        <option value="Gusau (North West )">Gusau (North West)</option>
                                        <option value="Kaduna (North West )">Kaduna (North West)</option>
                                        <option value="Kano (North West )">Kano (North West)</option>
                                        <option value="Katsina (North West )">katsina (North West)</option>
                                        <option value="Sokoto (North West )">Sokoto (North West)</option>
                                        <option value="Zaria (North West )">Zaria (North West)</option>
                                        <option value="Kanfachan (North West )">Kafanchan (North West)</option>
                                        <option value="Zuru Dist (North West)">Zuru Dist (North West)</option>
                                        <option value="Kalitungo (North West)">Kaltungo (North West)</option>
                                        <option value="Onitsha (South East)">Onitsha (South East)</option>
                                        <option value="Owerri (South East)">Owerri (South East)</option>
                                        <option value="Aba (South East)">Aba (South East)</option>
                                        <option value="Abakaliki (South East)">Abakaliki (South East)</option>
                                        <option value="Enugu (South East)">Enugu (South East)</option>
                                        <option value="Ohafia (South East)">Ohafia (South East)</option>
                                        <option value="Umuahia (South East)">Umuahia (South East)</option>
                                        <option value="Awka (South East)">Awka (South East)</option>
                                        <option value="Awka Etiti (South East)">Awka Etiti (South East)</option>
                                        <option value="Onueke (South East)">Onueke (South East)</option>
                                        <option value="Afikpo (South East)">Afikpo (South East)</option>
                                        <option value="Nsukka (South East)">Nsukka (South East)</option>
                                        <option value="Udi (South East)">Udi (South East)</option>
                                        <option value="Orlu (South East)">Orlu (South East)</option>
                                        <option value="Okigwe (South East)">Okigwe (South East)</option>
                                        <option value="Calabar (South South)">Calabar (South South)</option>
                                        <option value="Port-Harcourt  (South South)">Port-Harcourt  (South South)</option>
                                        <option value="Uyo (South South)">Uyo (South South)</option>
                                        <option value="Yenagoa (South South)">Yenagoa (South South)</option>
                                        <option value="Ikot-Ekpene (South South)">Ikot-Ekpene (South South)</option>
                                        <option value="Eket (South South)">Eket (South South)</option>
                                        <option value="Ogbia (South South)">Ogbia (South South)</option>
                                        <option value="Sagbama (South South)">Sagbama (South South)</option>
                                        <option value="Ogoja (South South)">Ogoja (South South)</option>
                                        <option value="Ikom (South South)">Ikom (South South)</option>
                                        <option value="Oyigbo (South South)">Oyigbo (South South)</option>
                                        <option value="Bonny (South South)">Bonny (South South)</option>
                                        <option value="Ahoada (South South)">Ahoada (South South)</option>
                                        <option value="Sango Ota (Sango Ota)">Sango Ota (Sango Ota)</option>
                                        <option value="Abeokuta (Abeokuta)">Abeokuta (Abeokuta)</option>
                                        <option value="Akure (Akure)">Akure (Akure)</option>
                                        <option value="Ibadan (Oyo)">Ibadan  (Oyo)</option>
                                        <option value="Ijebu Ode (Abeokuta)">Ijebu Ode (Abeokuta)</option>
                                        <option value="Ilaro (Sango Ota)">Ilaro (Sango Ota)</option>
                                        <option value="Osogbo (Akure)">Osogbo (Akure)</option>
                                        <option value="Ado Ekiti (Akure)">Ado Ekiti (Akure)</option>
                                        <option value="Oyo (Oyo)">Oyo (Oyo)</option>
                                        <option value="Ilorin (Kwara)">Ilorin (Kwara)</option>
                                        <option value="Okitipupa (Akure)">Okitipupa (Akure)</option>
                                        <option value="Ifo (Sango Ota)">Ifo (Sango Ota)</option>
                                        <option value="Oye Ekiti (Akure)">Oye Ekiti (Akure)</option>
                                        <option value="Ikere Ekiti (Akure)">Ikere Ekiti (Akure)</option>
                                        <option value="Kosubosu (Kwara)">Kosubosu (Kwara)</option>
                                        <option value="Oro (Kwara)">Oro (Kwara)</option>
                                        <option value="Itaoshin (Abeokuta)">Itaoshin (Abeokuta)</option>
                                        <option value="Sagamu (Abeokuta)">Sagamu (Abeokuta)</option>
                                        <option value="Owo (Akure)">Owo (Akure)</option>
                                        <option value="Ayepe (Akure)">Ayepe (Akure)</option>
                                        <option value="Ife (Akure)">Ife (Akure)</option>
                                        <option value="Ogbomoso (Kwara)">Ogbomoso (Kwara)</option>
                                        <option value="Shalom (Oyo)">Shalom (Oyo)</option>
                                        <option value="Molete (Oyo)">Molete (Oyo)</option>
                                        <option value="Tomori (Sango Ota)">Tomori (Sango Ota)</option>
                                        <option value="Ilesha (Akure)">Ilesha (Akure)</option>
                                        <option value="Omoluabi (Oyo)">Omoluabi (Oyo)</option>
                                        <option value="Iyana (Oyo)">Iyana (Oyo)</option>
                                        <option value="Ondo (Akure)">Ondo (Akure)</option>
                                        <option value="Owode (Sango Ota)">Owode (Sango Ota)</option>
                                        <option value="Ajebo (Abeokuta)">Ajebo (Abeokuta)</option>
                                        <option value="Obada Idiemi (Abeokuta)">Obada idiemi (Abeokuta)</option>
                                        <option value="Orimedu District (Orimedu District)">Orimedu District (Orimedu District)</option>
                                        <option value="Anthony District (Anthony District)">Anthony District (Anthony District)</option>
                                        <option value="Asokoro District (Asokoro District)">Asokoro District (Asokoro District)</option>
                                        <option value="Eleshin District (Eleshin District)">Eleshin District (Eleshin District)</option>
                                        <option value="Ijede District (Ijede District)">Ijede District (Ijede District)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2">
                                <div class="form-group">
                                    <label for="regType" class="text-primary">Registration type</label>
                                    <select class="browser-default custom-select form-control form-control-user" id="regType">
                                        <option value="" selected>Choose answer</option>
                                        <option value="regular">Regular</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2">
                                <div class="form-group">
                                    <label for="rName" class="text-primary">Registrer name</label>
                                    <input type="text" class="form-control form-control-user" id="rName"
                                        placeholder="Firstname Lastname">
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2">
                                <div class="form-group">
                                    <label for="hic" class="text-primary">House in camp?</label>
                                    <select class="browser-default custom-select form-control form-control-user" id="hic">
                                        <option value="" selected>Choose answer</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2">
                                <div class="form-group">
                                    <label for="pNumber" class="text-primary">Phone number</label>
                                    <input type="text" class="form-control form-control-user" id="pNumber"
                                        placeholder="Mobile">
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-2" style="padding-top: 32px">
                                <button class="form-control form-control-user btn btn-success" id="fetchStats"><i class="fas fa-search"></i> Search</button>
                            </div>
                        </div>
                        
                    </div>

                    <!-- DataTales Example -->
                    <div class="card shadow my-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-arrow-left" id="backToCampList" style="cursor: pointer"></i> View All Statistics</h6>
                            <h6 style="float: right">Total: <span class="font-weight-bold text-primary totalStats">0</span></h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Age Group</th>
                                            <th>Gender</th>
                                            <th>Foursquare Member?</th>
                                            <th>District</th>
                                            <th>Have House</th>
                                            <th>Amount Paid</th>
                                            <th>Reg Type</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Age Group</th>
                                            <th>Gender</th>
                                            <th>Foursquare Member?</th>
                                            <th>District</th>
                                            <th>Have House</th>
                                            <th>Amount Paid</th>
                                            <th>Reg Type</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </tfoot>
                                    <tbody id="statsList">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div id="pagination-demo1"></div>
                            <button class="btn btn-success float-right" id="exportToExcel">Export to Excel</button>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Powered By <a href="https://pci-ng.com">proSofts</a></span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" id="logoutButtonAdmin">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Central Modal Small -->
    <div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">

        <!-- Change class .modal-sm to change the size of the modal -->
        <div class="modal-dialog modal-sm" role="document">

            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title w-100" id="modalHeader"><i class="fas fa-exclamation-triangle text-danger"></i> Error</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body text-center" id="modalBody">
                    Email address is required
                </div>
                <!--div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary btn-sm">Save changes</button>
                </div-->
            </div>
        </div>
    </div>
    <!-- Central Modal Small -->

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <!--script src="js/demo/datatables-demo.js"></script-->

    <script src="js/jquery.table2excel.js"></script>
    <script src="../js/pagination.js"></script>

    <script type="text/javascript" src="../js/index.js"></script>


</body>

</html>