<?php

    include 'classes/User.php'; 

    include 'classes/DB/conn_db.php';

    

    $userObj = new User($conn, "", "", "", "", "");

    $auxData = $userObj->fetchAuxData();

    $campId = @$auxData['id'];

    $regularFee = @$auxData['fee'];

    $campName = @$auxData['name'];

?>

<!DOCTYPE html>

<html lang="en">

  <head>

    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <meta http-equiv="x-ua-compatible" content="ie=edge" />

    <title>Foursquare Youth Camp</title>

    <!-- MDB icon -->

    <link rel="icon" href="img/fsLogo.jpeg" type="image/x-icon" />

    <!-- Font Awesome -->

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">

    <!-- Google Fonts Roboto -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">

    <!-- Bootstrap core CSS -->

    <link rel="stylesheet" href="css/bootstrap.min.css">

    <!-- Material Design Bootstrap -->

    <link rel="stylesheet" href="css/mdb.min.css">

    <!-- Your custom styles (optional) -->

    <link rel="stylesheet" href="css/style.css">

  </head>

  

<body>

    <!-- Start your project here-->

    <!--Navbar -->

    <nav class="navbar navbar-expand-lg navbar-dark black">

      <a class="navbar-brand text-danger" href="#">Foursquare YC</a>

        <ul class="navbar-nav ml-auto nav-flex-icons">

            <li class="nav-item avatar dropdown">

            <a class="white-text mx-3" href="user/register-user"><i class="fas fa-plus"></i> Create Account</a>

            <a class="white-text" href="user/login"><i class="fas fa-key"></i> Login</a>

            </li>

        </ul>

    </nav>

    

    <div class="container">

        <!-- Panel 1 -->

        <div class="tab-pane fade in show active p-3" id="panel555" role="tabpanel">



            <?php

                $regForm = '



                <div class="d-flex flex-row justify-content-center">

                    <!-- Default switch -->

                    <span>Regular</span>&nbsp&nbsp

                    <div class="custom-control custom-switch">

                        <input type="checkbox" class="custom-control-input" id="customSwitches">

                        <label class="custom-control-label" for="customSwitches">Premium</label>

                    </div>

                </div>



                <div id="qrData" style="display: none;">'.$campId.'</div>



                <div id="regularDiv">



                    <h5 class="mt-4 text-primary">Regular Registration Form</h5>



                    <div class="alert alert-warning alert-dismissible fade show" role="alert">

                    <strong>Notice!</strong> Regular registration fee is #'.$regularFee.', any further contribution you made would be added to it and charged together.

                    <br/>The registration fee covers; Accomodation, All program materials and subsidized feeding

                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">

                        <span aria-hidden="true">&times;</span>

                    </button>

                    </div>



                    <div id="regularFee" style="display: none">'.$regularFee.'</div>



                    <div class="form-group">

                        <label for="firstname" class="grey-text">First Name <span class="text-danger">*</span></label>

                        <input type="text" class="form-control" id="rfirstname" placeholder="Enter first name">

                    </div>



                    <div class="form-group">

                        <label for="lastname" class="grey-text">Last Name <span class="text-danger">*</span></label>

                        <input type="text" class="form-control" id="rlastname" placeholder="Enter last name">

                    </div>



                    <div class="form-group">

                        <label for="phone" class="grey-text">Phone number <span class="text-danger">*</span></label>

                        <input type="number" class="form-control" id="rphone" placeholder="Enter phone number">

                    </div>



                    <div class="form-group">

                        <label for="email" class="grey-text">Email Address</label>

                        <input type="email" class="form-control" id="remail" placeholder="Enter email address">

                    </div>



                    <div class="form-group">

                        <label class="grey-text">Age Group <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="rageGroup">

                            <option value="" selected>Choose age group</option>

                            <option value="11-20 years">11-20 years</option>

                            <option value="21-30 years">21-30 years</option>

                            <option value="31-40 years">31-40 years</option>

                            <option value="41-50 years">41-50 years</option>

                            <option value="Above 50 years">above 50 years</option>

                        </select>

                    </div>

                    

                    <div class="form-group">

                        <label class="grey-text">Gender <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="rgender">

                            <option value="" selected>Choose gender</option>

                            <option value="male">Male</option>

                            <option value="female">Female</option>

                        </select>

                    </div>



                    <div class="form-group">

                        <label class="grey-text">Are you a Foursquare member? <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="rmember">

                            <option value="" selected>Choose answer</option>

                            <option value="Yes">Yes</option>

                            <option value="No">No</option>

                        </select>

                    </div>



                    <div class="form-group" id="rdistrictDiv">

                        <label class="grey-text">District <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="rdistrict">

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

                            <option value="Warri District (Warri District)">Warri District (Warri District)</option>

                        </select>

                    </div>



                    <div class="form-group">

                        <label for="anyAmount" class="grey-text">Are you willing to support '.$campName.' financially(Any amount) </label>

                        <input type="number" class="form-control" id="anyAmount" placeholder="Enter the amount">

                    </div>



                    <div class="form-group text-center">

                    <button class="btn btn-danger btn-rounded" id="rregisterLoader" type="button" style="display: none">

                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

                        Loading...

                    </button>
                    <button type="button" class="btn btn-rounded btn-danger"  onclick="rregisterCampAnonymous()"><i class="far fa-plus-square pr-2" aria-hidden="true"></i> Register Now</button>


                    </div>



                </div>



                <div id="premiumDiv" style="display: none">



                    <h5 class="mt-4 text-success">Premium Registration Form</h5>



                    <div class="alert alert-warning alert-dismissible fade show" role="alert">

                    <strong>Notice!</strong> Registration fee covers special treats on; Accomodation, program materials and subsidized feeding.

                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">

                        <span aria-hidden="true">&times;</span>

                    </button>

                    </div>



                    <div class="form-group">

                        <label for="pfirstname" class="grey-text">First Name <span class="text-danger">*</span></label>

                        <input type="text" class="form-control" id="pfirstname" placeholder="Enter first name">

                    </div>



                    <div class="form-group">

                        <label for="plastname" class="grey-text">Last Name <span class="text-danger">*</span></label>

                        <input type="text" class="form-control" id="plastname" placeholder="Enter last name">

                    </div>



                    <div class="form-group">

                        <label for="pphone" class="grey-text">Phone number <span class="text-danger">*</span></label>

                        <input type="number" class="form-control" id="pphone" placeholder="Enter phone number">

                    </div>



                    <div class="form-group">

                        <label for="pemail" class="grey-text">Email Address</label>

                        <input type="email" class="form-control" id="pemail" placeholder="Enter email address">

                    </div>



                    <div class="form-group">

                        <label class="grey-text">Age Group <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="pageGroup">

                            <option value="" selected>Choose age group</option>

                            <option value="11-20 years">11-20 years</option>

                            <option value="21-30 years">21-30 years</option>

                            <option value="31-40 years">31-40 years</option>

                            <option value="41-50 years">41-50 years</option>

                            <option value="Above 50 years">above 50 years</option>

                        </select>

                    </div>

                    

                    <div class="form-group">

                        <label class="grey-text">Gender <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="pgender">

                            <option value="" selected>Choose gender</option>

                            <option value="male">Male</option>

                            <option value="female">Female</option>

                        </select>

                    </div>



                    <div class="form-group">

                        <label class="grey-text">Are you a Foursquare member? <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="pmember">

                            <option value="" selected>Choose answer</option>

                            <option value="Yes">Yes</option>

                            <option value="No">No</option>

                        </select>

                    </div>



                    <div class="form-group" id="pdistrictDiv">

                        <label class="grey-text">District <span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="pdistrict">

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

                            <option value="Warri District (Warri District)">Warri District (Warri District)</option>

                        </select>

                    </div>



                    <div class="form-group">

                        <label class="grey-text">Kindly pick a category for your registration<span class="text-danger">*</span></label>

                        <select class="browser-default custom-select" id="premiumAmount">

                            <option value="" selected>Choose answer</option>

                            <option value="30000">30,000</option>

                            <option value="50000">50,000</option>

                            <option value="100000">100,000</option>

                            <option value="more">Others (Specify)</option>

                        </select>

                    </div>



                    <div class="form-group" id="amountDiv" style="display: none">

                        <label for="otherAmount" class="grey-text">Specify amount <span class="text-danger">*</span></label>

                        <input type="number" class="form-control" id="otherAmount" placeholder="Enter amount">

                    </div>



                    <div class="form-group text-center">

                    <button class="btn btn-danger btn-rounded" id="pregisterLoader" type="button" style="display: none">

                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

                        Loading...

                    </button>
                    <button type="button" class="btn btn-rounded btn-danger" onclick="pregisterCampAnonymousfunc()"><i class="far fa-plus-square pr-2" aria-hidden="true"></i></i>Register Now</button>


                    </div>



                </div>



                ';

                $noRegForm = '<div class="text-center">

                                <img src="admin/img/undraw_camping_noc8.svg" style="max-width: 200px; max-height: auto;"/>

                                <div class="text-center text-danger mt-5">No active camp available</div>

                            </div>';    

                echo ($campId != "") ? $regForm : $noRegForm;

            ?>



            </div>

            <!-- Panel 1 -->

        </div>

        
        <div class="container text-center">

            <p>Powered By <span class="text-danger" style="font-weight: bold;"><a class="text-danger" href="https://pci-ng.com" target="_blank">proSofts</a></span></p>

        </div>

    <!-- End your project here-->



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



    <!-- Central Modal Large -->

    <div class="modal fade" id="historyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"

    aria-hidden="true">



        <!-- Change class .modal-sm to change the size of the modal -->

        <div class="modal-dialog modal-lg" role="document">



            <div class="modal-content">

                <div class="modal-header">

                <h4 class="modal-title w-100" id="modalHeaderHistory"><i class="fas fa-exclamation-triangle text-danger"></i> Error</h4>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                    <span aria-hidden="true">&times;</span>

                </button>

                </div>

                <div class="modal-body text-center">

                  <div class="table-responsive">

                    <!--Table-->

                    <table class="table table-striped">

                  

                      <!--Table head-->

                      <thead>

                        <tr>

                          <th>Camp</th>

                          <th>Fullname</th>

                          <th>Gender</th>

                          <th>Kids</th>

                          <th>Age group</th>

                          <th>District</th>

                          <th>Arrival</th>

                          <th>Amount paid</th>

                        </tr>

                      </thead>

                      <!--Table head-->

                  

                      <!--Table body-->

                      <tbody  id="modalBodyHistory">

                        

                      </tbody>

                      <!--Table body-->

                    </table>

                    <!--Table-->

                  </div>

                </div>

                <!--div class="modal-footer">

                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>

                <button type="button" class="btn btn-primary btn-sm">Save changes</button>

                </div-->

            </div>

        </div>

    </div>

    <!-- Central Modal Large -->



    <!-- QrCode Modal Large -->

    <div class="modal fade" id="qrModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"

    aria-hidden="true">



        <!-- Change class .modal-sm to change the size of the modal -->

        <div class="modal-dialog modal-md" role="document">



            <div class="modal-content" style="height: 500px">

                <div class="modal-header" id="modalHeader">

                    <h6 class="text-danger">Make sure to take a screen capture of your QR Code</h6>

                </div>

                <div class="modal-body text-center">

                  <div id="qrCode" style="width: 128px; height: 128px;"></div>

                </div>

                <div class="modal-footer">

                    <!--button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button-->

                    <button type="button" class="btn btn-danger btn-sm" id="okRegAnonymous">Ok</button>



                </div>

            </div>

        </div>

    </div>

    <!-- QrCode Modal Large -->



    <!-- jQuery -->

    <script type="text/javascript" src="js/jquery.min.js"></script>

    <!-- Bootstrap tooltips -->

    <script type="text/javascript" src="js/popper.min.js"></script>

    <!-- Bootstrap core JavaScript -->

    <script type="text/javascript" src="js/bootstrap.min.js"></script>

    <!-- MDB core JavaScript -->

    <script type="text/javascript" src="js/mdb.min.js"></script>

    <!-- Your custom scripts (optional) -->

    <script type="text/javascript" src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>

    <script src="https://js.paystack.co/v1/inline.js"></script> 

    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/payedin.js"></script>


    <script type="text/javascript">

        $('.datepicker').datepicker({

            inline: true

        });

    </script>

  </body>

</html>