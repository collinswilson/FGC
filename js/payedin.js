function setModal(params) {
    params.headerSelector === null ? null : params.headerSelector.html(params.headerContent);
    params.bodySelector === null ? null : params.bodySelector.html(params.bodyContent);
    params.footerSelector === null ? null : params.footerSelector.html(params.footerContent);
    params.modalSelector.modal(params.modalState === "show" ? "show" : "hide");
}


const confirmPayment = (ref) => {
    console.log(ref)
    let search = 'ss'
    let tx_ref = ref
    $.post("../classes/controller.php", {search, tx_ref}, (data) => {
        console.log(data, "ddd")
        let d = data || false
        if (d) {
            console.log(JSON.parse(d), "ff") 
            // get userId and campId from database  with ref
            let dd = JSON.parse(d)[0]
            const userId = dd.userId
            const campId = dd.campId
            let qrcode = new QRCode('qrCode');
            qrcode.makeCode(userId + ':' + campId + ':' + tx_ref);
            setModal({
                headerSelector: $("#modalHeader"),
                headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                bodySelector: $("#modalBody"),
                bodyContent: "",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#qrModal"),
                modalState: "show"
            });
        } else {
            // if no data link is invalid 
            setModal({
                headerSelector: $("#modalHeader"),
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent: "Server error, try again!",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
    
            $("#rregisterLoader").hide('slow');
            $("#rregisterCampAnonymous").show('slow');
        }
    } )
}

let url_string = window.location.href
var url = new URL(url_string);
var ref = url.searchParams.get("tx_ref");
console.log(ref, "FFF")
ref && confirmPayment(ref)

const rregisterCampAnonymous = () => {
    let firstname = $("#rfirstname").val();
    let lastname = $("#rlastname").val();
    let phone = $("#rphone").val();
    let email = $("#remail").val();
    let ageGroup = $("#rageGroup").val();
    let gender = $("#rgender").val();
    let kidsComing = $("#rkidsComing").val();
    let kidsNumber = $("#rkidsNumber").val();
    let member = $("#rmember").val();
    let district = $("#rdistrict").val();
    let arrivalDate = $("#rarrivalDate").val();
    let houseAccess = $("#rhouseAccess").val();
    let anyAmount = $("#anyAmount").val();
    let regularFee = $("#regularFee").text();
    let pregularRegAnonymous = "rr";
    let payment_status = 0
    let tx_ref = 'KC-' + new Date().getTime()
    let qrData = $("#qrData").text();
    let campId = qrData;
    let userId = '' + Math.floor((Math.random() * 1000000000) + 1);


    if (firstname === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "First name is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (lastname === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Last name is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (phone === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Phone numner is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (ageGroup === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Age group is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (gender == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Gender is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (kidsComing == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Are you coming with kids?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (member == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Are you a foursquare member?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (arrivalDate == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Arrival date is a required field!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (houseAccess == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Do you have access to a house in camp?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else {
        $("#rregisterLoader").show('slow');
        $("#rregisterCampAnonymous").hide('slow');
        // save data to database 
        $.post("classes/controller.php", { pregularRegAnonymous, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount, ref, userId, campId, payment_status, tx_ref }, function(data){
            console.log(data);
            if(data === "Registration Successful"){
                let data = window.btoa(JSON.stringify({ amount: anyAmount == "" ? regularFee : parseInt(anyAmount) + parseInt(regularFee), email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email, name: firstname + lastname, tx_ref: tx_ref }))
                frame(data)
                // let qrcode = new QRCode('qrCode');
                // qrcode.makeCode(userId + ':' + campId + ':' + ref);

                // setModal({
                //     headerSelector: $("#modalHeader"), 
                //     headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                //     bodySelector: $("#modalBody"),
                //     bodyContent:  "",
                //     footerSelector: null,
                //     footerContent: null,
                //     modalSelector: $("#qrModal"),
                //     modalState: "show"
                // });
            
            }else{
                setModal({
                    headerSelector: $("#modalHeader"), 
                    headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                    bodySelector: $("#modalBody"),
                    bodyContent:  "Server error, try again!",
                    footerSelector: null,
                    footerContent: null,
                    modalSelector: $("#regModal"),
                    modalState: "show"
                });
                
                $("#rregisterLoader").hide('slow');
                $("#rregisterCampAnonymous").show('slow');
            }
        });
       


    }
}

const pregisterCampAnonymous = () => {
    let firstname = $("#pfirstname").val();
    let lastname = $("#plastname").val();
    let phone = $("#pphone").val();
    let email = $("#pemail").val();
    let ageGroup = $("#pageGroup").val();
    let gender = $("#pgender").val();
    let kidsComing = $("#pkidsComing").val();
    let kidsNumber = $("#pkidsNumber").val();
    let member = $("#pmember").val();
    let district = $("#pdistrict").val();
    let arrivalDate = $("#parrivalDate").val();
    let houseAccess = $("#phouseAccess").val();
    let premiumAmount = $("#premiumAmount").val() === "more" ? $("#otherAmount").val() : $("#premiumAmount").val();
    let premiumRegAnonymous = "pr";
    let payment_status = 0
    let reference = 'KC-' + new Date().getTime()
    let qrData = $("#qrData").text();
    let campId = qrData;
    let userId = '' + Math.floor((Math.random() * 1000000000) + 1);
    if (firstname === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "First name is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (lastname === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Last name is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (phone === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Phone numner is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (ageGroup === "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Age group is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (gender == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Gender is required!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (kidsComing == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Are you coming with kids?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (member == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Are you a foursquare member?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (arrivalDate == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Arrival date is a required field!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (houseAccess == "") {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Do you have access to a house in camp?!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else if (premiumAmount == "" || premiumAmount < 30000) {
        setModal({
            headerSelector: $("#modalHeader"),
            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
            bodySelector: $("#modalBody"),
            bodyContent: "Registration category is required, make sure amount is not lower than N30,000!",
            footerSelector: null,
            footerContent: null,
            modalSelector: $("#regModal"),
            modalState: "show"
        });
    } else {
        $("#pregisterLoader").show('slow');
        $("#pregisterCampAnonymous").hide('slow');
        let handler = PaystackPop.setup({
            key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',
            //key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e', // Replace with your public key
            email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,
            amount: premiumAmount * 100,
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"
            onClose: function () {
                setModal({
                    headerSelector: $("#modalHeader"),
                    headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",
                    bodySelector: $("#modalBody"),
                    bodyContent: "You just cancelled the ongoing payment!",
                    footerSelector: null,
                    footerContent: null,
                    modalSelector: $("#regModal"),
                    modalState: "show"
                });

                $("#pregisterLoader").hide('slow');
                $("#pregisterCampAnonymous").show('slow');
            },
            callback: function (response) {
                console.log(response);
                //let message = 'Payment complete! Reference: ' + response.reference;
                //alert(message);
                let ref = response.reference;

                $.post("classes/controller.php", { premiumRegAnonymous, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, premiumAmount, ref, userId, campId }, function (data) {
                    if (data === "Registration Successful") {
                        let qrcode = new QRCode('qrCode');
                        qrcode.makeCode(userId + ':' + campId + ':' + ref);

                        setModal({
                            headerSelector: $("#modalHeader"),
                            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                            bodySelector: $("#modalBody"),
                            bodyContent: "",
                            footerSelector: null,
                            footerContent: null,
                            modalSelector: $("#qrModal"),
                            modalState: "show"
                        });
                    } else {
                        setModal({
                            headerSelector: $("#modalHeader"),
                            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                            bodySelector: $("#modalBody"),
                            bodyContent: "Server error, try again!",
                            footerSelector: null,
                            footerContent: null,
                            modalSelector: $("#regModal"),
                            modalState: "show"
                        });

                        $("#pregisterLoader").hide('slow');
                        $("#pregisterCampAnonymous").show('slow');
                    }
                });
            }
        });
        let data = window.btoa(JSON.stringify({ amount: premiumAmount , email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email, name: firstname + lastname, tx_ref: reference }))
        // handler.openIframe();
        frame(data)

    }

}

const frame = (d) => {
    let link = `https://dev.app.payedin.co/pay/MzI1Nw==?data=${d}`
    window.open(link, "_self")
}




console.log("Payedin load ")