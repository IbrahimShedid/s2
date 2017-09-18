var app = angular.module("mainApp", ['ui.bootstrap']);

app.controller("mainController", ['$scope', '$compile', function ($scope, $compile) {
    //Dropdown autocomplete
    $scope.usersArray = [
        {
            'name': 'Alabama',
            'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
        }, {
            'name': 'Alaska',
            'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'
        }, {
            'name': 'Arizona',
            'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
        }, {
            'name': 'Arkansas',
            'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
        }, {
            'name': 'California',
            'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
        }, {
            'name': 'Colorado',
            'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
        }, {
            'name': 'Connecticut',
            'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
        }, {
            'name': 'Delaware',
            'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'
        }, {
            'name': 'Florida',
            'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
        }, {
            'name': 'Georgia',
            'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
        }, {
            'name': 'Hawaii',
            'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'
        }, {
            'name': 'Idaho',
            'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
        }, {
            'name': 'Illinois',
            'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'
        }, {
            'name': 'Indiana',
            'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
        }, {
            'name': 'Iowa',
            'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'
        }, {
            'name': 'Kansas',
            'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
        }, {
            'name': 'Kentucky',
            'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
        }, {
            'name': 'Louisiana',
            'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
        }, {
            'name': 'Maine',
            'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'
        }, {
            'name': 'Maryland',
            'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
        }, {
            'name': 'Massachusetts',
            'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
        }, {
            'name': 'Michigan',
            'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
        }, {
            'name': 'Minnesota',
            'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
        }, {
            'name': 'Mississippi',
            'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
        }, {
            'name': 'Missouri',
            'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'
        }, {
            'name': 'Montana',
            'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
        }, {
            'name': 'Nebraska',
            'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'
        }, {
            'name': 'Nevada',
            'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
        }, {
            'name': 'New Hampshire',
            'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
        }, {
            'name': 'New Jersey',
            'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
        }, {
            'name': 'New Mexico',
            'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
        }, {
            'name': 'New York',
            'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
        }, {
            'name': 'North Carolina',
            'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
        }, {
            'name': 'North Dakota',
            'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
        }, {
            'name': 'Ohio',
            'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'
        }, {
            'name': 'Oklahoma',
            'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
        }, {
            'name': 'Oregon',
            'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'
        }, {
            'name': 'Pennsylvania',
            'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
        }, {
            'name': 'Rhode Island',
            'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
        }, {
            'name': 'South Carolina',
            'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
        }, {
            'name': 'South Dakota',
            'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
        }, {
            'name': 'Tennessee',
            'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'
        }, {
            'name': 'Texas',
            'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
        }, {
            'name': 'Utah',
            'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'
        }, {
            'name': 'Vermont',
            'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
        }, {
            'name': 'Virginia',
            'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
        }, {
            'name': 'Washington',
            'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
        }, {
            'name': 'West Virginia',
            'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
        }, {
            'name': 'Wisconsin',
            'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
        }, {
            'name': 'Wyoming',
            'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'
        }
    ];

    // Tables and sorting 
    $scope.sortType = 'fieldName'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.roles = [
        {
            id: "01",
            fieldName: 'Methode of norifaction',
            lookupType: 'CallNote',
            hidden: true,
            read: false,
            readWrite: false
        },
        {
            id: "02",
            fieldName: 'Method of notification',
            lookupType: 'CallNote',
            hidden: true,
            read: false,
            readWrite: false
        },
        {
            id: "03",
            fieldName: 'Contractual Converage',
            lookupType: 'CallNote',
            hidden: true,
            read: false,
            readWrite: false
        },
        {
            id: "04",
            fieldName: 'Resolve Promise Date',
            lookupType: 'CallNote',
            hidden: true,
            read: false,
            readWrite: false
        },
        {
            id: "05",
            fieldName: 'Closing Type',
            lookupType: 'CallNote',
            hidden: false,
            read: false,
            readWrite: true
        },
        {
            id: "06",
            fieldName: 'Forced termination Reason',
            lookupType: 'CallNote',
            hidden: false,
            read: false,
            readWrite: true
        },
        {
            id: "07",
            fieldName: 'Closing Warranting Type',
            lookupType: 'CallNote',
            hidden: true,
            read: false,
            readWrite: false
        }
  ]
    $scope.customerSites = [
        {
            id: "01",
            Site: 'Methode of norifaction'

        }, {
            id: "02",
            Site: 'Methode of norifaction'

        }, {
            id: "03",
            Site: 'Methode of norifaction'

        }
  ]

    //Add new Row in customerSites //
    $scope.addSite = function () {
        var newSite = {
            id: $scope.id,
            Site: $scope.Site
        };

        $scope.customerSites.push(newSite);
    };
    //Add Remove Row customerSites //
    $scope.deleteSite = function (index) {
        $scope.customerSites.splice(index, 1);
    };

    $scope.customerContacts = [
            {
                id: "01",
                Number: '0123456789'

        }, {
                id: "02",
                Number: '9876543210'

        }, {
                id: "03",
                Number: '9517538520'

        }
  ]
        //Add new Row in customerContacts //
    $scope.addContact = function () {
        var contact = {
            id: $scope.id,
            Number: $scope.Number,
        };

        $scope.customerContacts.push(contact);
    };
    //Add Remove Row customerContacts //
    $scope.deleteContact = function (index) {
        $scope.customerContacts.splice(index, 1);
    };

    //Edite Row Tables //
    $scope.edit = function (index) {
        index.showLabel = !index.showLabel;
    }

    $scope.products = [
            {
                id: "01",
                versionNumber: '0.8'
        }, {
                id: "02",
                versionNumber: '5.8'
        }, {
                id: "03",
                versionNumber: '4.5'
        }
  ]
        //Add new Row in products //
    $scope.addVersion = function () {
        var version = {
            id: $scope.id,
            versionNumber: $scope.versionNumber,
        };

        $scope.products.push(version);
    };
    //Add Remove Row customerContacts //
    $scope.deleteVersion = function (index) {
        $scope.products.splice(index, 1);
    };
    // move items up and down
    var move = function (origin, destination) {
        var temp = $scope.products[destination];
        $scope.products[destination] = $scope.products[origin];
        $scope.products[origin] = temp;
    };

    $scope.moveUp = function (index) {
        move(index, index - 1);
    };

    $scope.moveDown = function (index) {
        move(index, index + 1);
    };
    

    //add new field in tab
    $scope.count = 0;
    $scope.addNew = function () {
        if ($scope.count < 5) {
            var html = '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><div class="form-group "><select name="" class="form-control minimal" required="required"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option><option value="4">Option 4</option><option value="5">Option 5</option></select></div></div>';
            var topScope = angular.element(document).scope();
            var elem = $compile(html)(topScope);
            angular.element($('.parent')).append(elem);
            $scope.count++;
        }

    };

            }]);


$(document).ready(function () {
    $(".mCustomScrollbar").mCustomScrollbar({
        setHeight: 300,
        theme: "dark-3"
    });
});
