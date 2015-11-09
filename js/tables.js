$(document).ready(function() {
    //   --------------------------------------------------------
    //   BACKBONE STUFF
    //   --------------------------------------------------------
    Backbone.pubSub = _.extend({}, Backbone.Events);

    var Employee = Backbone.Model.extend({
        name: ''
    }, {
        position: ''
    }, {
        location: ''
    }, {
        id: ''
    }, {
        start_date: ''
    }, {
        salary: 0
    });

    var Employees = Backbone.Collection.extend({
        model: Employee
    });



    var AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function(collection) {
            this.collection = collection;
            Backbone.pubSub.on('change', this.change, this);
        },
        events: {
            "click #add": "add"
        },
        update: function(id, attr, value) {
            var employee = this.collection.get(id);
            employee.set(attr, value);
        },
        add: function(attributes) {
            var employee = new Employee(attributes);

            this.collection.add(employee);
        },
        change: function(changes, source, updateSelf) {
            var model;
            for (var i = 0; i < changes.length; i++) {
                //get collection model at id
                model = this.collection.get(changes[i].data.id);
                model.set(changes[i].key, changes[i].val);
                //update corresponding source with model data
                if (source == 'handsontable') {
                    var data = model.toJSON();
                    table.row('#' + model.get('id')).data(data);
                } else if (source == 'datatable') {
                    var index = this.collection.indexOf(model),
                       data = model.toJSON();
                  //update handsontable
                  for (var j = 0; j < changes.length; j++){
                    hot.setDataAtRowProp(index, changes[i].key, changes[i].val);
                  }
                     //update datatable
                    table.row('#' + model.get('id')).data(data);
                }
            }
        },
        addToDataTable: function(model) {
            table.fnAddData(model.toJSON());
        },
        addToHandsonTable: function(model) {
            var arr = objArrayTo2DArray(model.toJSON());
            hot.populateFromArray(hot.getLastVisibleRow(), 0, arr);
        }
    });


    var data = [{
            "name": "Tiger Nixon",
            "position": "System Architect",
            "salary": "$320,800",
            "start_date": "2011/04/25",
            "office": "Edinburgh",
            "id": "5421"
        }, {
            "name": "Garrett Winters",
            "position": "Accountant",
            "salary": "$170,750",
            "start_date": "2011/07/25",
            "office": "Tokyo",
            "id": "8422"
        }, {
            "name": "Ashton Cox",
            "position": "Junior Technical Author",
            "salary": "$86,000",
            "start_date": "2009/01/12",
            "office": "San Francisco",
            "id": "1562"
        }, {
            "name": "Cedric Kelly",
            "position": "Senior Javascript Developer",
            "salary": "$433,060",
            "start_date": "2012/03/29",
            "office": "Edinburgh",
            "id": "6224"
        }, {
            "name": "Airi Satou",
            "position": "Accountant",
            "salary": "$162,700",
            "start_date": "2008/11/28",
            "office": "Tokyo",
            "id": "5407"
        }, {
            "name": "Brielle Williamson",
            "position": "Integration Specialist",
            "salary": "$372,000",
            "start_date": "2012/12/02",
            "office": "New York",
            "id": "4804"
        }, {
            "name": "Herrod Chandler",
            "position": "Sales Assistant",
            "salary": "$137,500",
            "start_date": "2012/08/06",
            "office": "San Francisco",
            "id": "9608"
        }, {
            "name": "Rhona Davidson",
            "position": "Integration Specialist",
            "salary": "$327,900",
            "start_date": "2010/10/14",
            "office": "Tokyo",
            "id": "6200"
        }, {
            "name": "Colleen Hurst",
            "position": "Javascript Developer",
            "salary": "$205,500",
            "start_date": "2009/09/15",
            "office": "San Francisco",
            "id": "2360"
        }, {
            "name": "Sonya Frost",
            "position": "Software Engineer",
            "salary": "$103,600",
            "start_date": "2008/12/13",
            "office": "Edinburgh",
            "id": "1667"
        }, {
            "name": "Jena Gaines",
            "position": "Office Manager",
            "salary": "$90,560",
            "start_date": "2008/12/19",
            "office": "London",
            "id": "3814"
        }, {
            "name": "Quinn Flynn",
            "position": "Support Lead",
            "salary": "$342,000",
            "start_date": "2013/03/03",
            "office": "Edinburgh",
            "id": "9497"
        }, {
            "name": "Charde Marshall",
            "position": "Regional Director",
            "salary": "$470,600",
            "start_date": "2008/10/16",
            "office": "San Francisco",
            "id": "6741"
        }, {
            "name": "Haley Kennedy",
            "position": "Senior Marketing Designer",
            "salary": "$313,500",
            "start_date": "2012/12/18",
            "office": "London",
            "id": "3597"
        }, {
            "name": "Tatyana Fitzpatrick",
            "position": "Regional Director",
            "salary": "$385,750",
            "start_date": "2010/03/17",
            "office": "London",
            "id": "1965"
        }, {
            "name": "Michael Silva",
            "position": "Marketing Designer",
            "salary": "$198,500",
            "start_date": "2012/11/27",
            "office": "London",
            "id": "1581"
        }, {
            "name": "Paul Byrd",
            "position": "Chief Financial Officer (CFO)",
            "salary": "$725,000",
            "start_date": "2010/06/09",
            "office": "New York",
            "id": "3059"
        }, {
            "name": "Gloria Little",
            "position": "Systems Administrator",
            "salary": "$237,500",
            "start_date": "2009/04/10",
            "office": "New York",
            "id": "1721"
        }, {
            "name": "Bradley Greer",
            "position": "Software Engineer",
            "salary": "$132,000",
            "start_date": "2012/10/13",
            "office": "London",
            "id": "2558"
        }, {
            "name": "Dai Rios",
            "position": "Personnel Lead",
            "salary": "$217,500",
            "start_date": "2012/09/26",
            "office": "Edinburgh",
            "id": "2290"
        }, {
            "name": "Jenette Caldwell",
            "position": "Development Lead",
            "salary": "$345,000",
            "start_date": "2011/09/03",
            "office": "New York",
            "id": "1937"
        }, {
            "name": "Yuri Berry",
            "position": "Chief Marketing Officer (CMO)",
            "salary": "$675,000",
            "start_date": "2009/06/25",
            "office": "New York",
            "id": "6154"
        }, {
            "name": "Caesar Vance",
            "position": "Pre-Sales Support",
            "salary": "$106,450",
            "start_date": "2011/12/12",
            "office": "New York",
            "id": "8330"
        }, {
            "name": "Doris Wilder",
            "position": "Sales Assistant",
            "salary": "$85,600",
            "start_date": "2010/09/20",
            "office": "Sidney",
            "id": "3023"
        }, {
            "name": "Angelica Ramos",
            "position": "Chief Executive Officer (CEO)",
            "salary": "$1,200,000",
            "start_date": "2009/10/09",
            "office": "London",
            "id": "5797"
        }, {
            "name": "Gavin Joyce",
            "position": "Developer",
            "salary": "$92,575",
            "start_date": "2010/12/22",
            "office": "Edinburgh",
            "id": "8822"
        }, {
            "name": "Jennifer Chang",
            "position": "Regional Director",
            "salary": "$357,650",
            "start_date": "2010/11/14",
            "office": "Singapore",
            "id": "9239"
        }, {
            "name": "Brenden Wagner",
            "position": "Software Engineer",
            "salary": "$206,850",
            "start_date": "2011/06/07",
            "office": "San Francisco",
            "id": "1314"
        }, {
            "name": "Fiona Green",
            "position": "Chief Operating Officer (COO)",
            "salary": "$850,000",
            "start_date": "2010/03/11",
            "office": "San Francisco",
            "id": "2947"
        }, {
            "name": "Shou Itou",
            "position": "Regional Marketing",
            "salary": "$163,000",
            "start_date": "2011/08/14",
            "office": "Tokyo",
            "id": "8899"
        }, {
            "name": "Michelle House",
            "position": "Integration Specialist",
            "salary": "$95,400",
            "start_date": "2011/06/02",
            "office": "Sidney",
            "id": "2769"
        }, {
            "name": "Suki Burks",
            "position": "Developer",
            "salary": "$114,500",
            "start_date": "2009/10/22",
            "office": "London",
            "id": "6832"
        }, {
            "name": "Prescott Bartlett",
            "position": "Technical Author",
            "salary": "$145,000",
            "start_date": "2011/05/07",
            "office": "London",
            "id": "3606"
        }, {
            "name": "Gavin Cortez",
            "position": "Team Leader",
            "salary": "$235,500",
            "start_date": "2008/10/26",
            "office": "San Francisco",
            "id": "2860"
        }, {
            "name": "Martena Mccray",
            "position": "Post-Sales support",
            "salary": "$324,050",
            "start_date": "2011/03/09",
            "office": "Edinburgh",
            "id": "8240"
        }, {
            "name": "Unity Butler",
            "position": "Marketing Designer",
            "salary": "$85,675",
            "start_date": "2009/12/09",
            "office": "San Francisco",
            "id": "5384"
        }, {
            "name": "Howard Hatfield",
            "position": "Office Manager",
            "salary": "$164,500",
            "start_date": "2008/12/16",
            "office": "San Francisco",
            "id": "7031"
        }, {
            "name": "Hope Fuentes",
            "position": "Secretary",
            "salary": "$109,850",
            "start_date": "2010/02/12",
            "office": "San Francisco",
            "id": "6318"
        }, {
            "name": "Vivian Harrell",
            "position": "Financial Controller",
            "salary": "$452,500",
            "start_date": "2009/02/14",
            "office": "San Francisco",
            "id": "9422"
        }, {
            "name": "Timothy Mooney",
            "position": "Office Manager",
            "salary": "$136,200",
            "start_date": "2008/12/11",
            "office": "London",
            "id": "7580"
        }, {
            "name": "Jackson Bradshaw",
            "position": "Director",
            "salary": "$645,750",
            "start_date": "2008/09/26",
            "office": "New York",
            "id": "1042"
        }, {
            "name": "Olivia Liang",
            "position": "Support Engineer",
            "salary": "$234,500",
            "start_date": "2011/02/03",
            "office": "Singapore",
            "id": "2120"
        }, {
            "name": "Bruno Nash",
            "position": "Software Engineer",
            "salary": "$163,500",
            "start_date": "2011/05/03",
            "office": "London",
            "id": "6222"
        }, {
            "name": "Sakura Yamamoto",
            "position": "Support Engineer",
            "salary": "$139,575",
            "start_date": "2009/08/19",
            "office": "Tokyo",
            "id": "9383"
        }, {
            "name": "Thor Walton",
            "position": "Developer",
            "salary": "$98,540",
            "start_date": "2013/08/11",
            "office": "New York",
            "id": "8327"
        }, {
            "name": "Finn Camacho",
            "position": "Support Engineer",
            "salary": "$87,500",
            "start_date": "2009/07/07",
            "office": "San Francisco",
            "id": "2927"
        }, {
            "name": "Serge Baldwin",
            "position": "Data Coordinator",
            "salary": "$138,575",
            "start_date": "2012/04/09",
            "office": "Singapore",
            "id": "8352"
        }, {
            "name": "Zenaida Frank",
            "position": "Software Engineer",
            "salary": "$125,250",
            "start_date": "2010/01/04",
            "office": "New York",
            "id": "7439"
        }, {
            "name": "Zorita Serrano",
            "position": "Software Engineer",
            "salary": "$115,000",
            "start_date": "2012/06/01",
            "office": "San Francisco",
            "id": "4389"
        }, {
            "name": "Jennifer Acosta",
            "position": "Junior Javascript Developer",
            "salary": "$75,650",
            "start_date": "2013/02/01",
            "office": "Edinburgh",
            "id": "3431"
        }, {
            "name": "Cara Stevens",
            "position": "Sales Assistant",
            "salary": "$145,600",
            "start_date": "2011/12/06",
            "office": "New York",
            "id": "3990"
        }, {
            "name": "Hermione Butler",
            "position": "Regional Director",
            "salary": "$356,250",
            "start_date": "2011/03/21",
            "office": "London",
            "id": "1016"
        }, {
            "name": "Lael Greer",
            "position": "Systems Administrator",
            "salary": "$103,500",
            "start_date": "2009/02/27",
            "office": "London",
            "id": "6733"
        }, {
            "name": "Jonas Alexander",
            "position": "Developer",
            "salary": "$86,500",
            "start_date": "2010/07/14",
            "office": "San Francisco",
            "id": "8196"
        }, {
            "name": "Shad Decker",
            "position": "Regional Director",
            "salary": "$183,000",
            "start_date": "2008/11/13",
            "office": "Edinburgh",
            "id": "6373"
        }, {
            "name": "Michael Bruce",
            "position": "Javascript Developer",
            "salary": "$183,000",
            "start_date": "2011/06/27",
            "office": "Singapore",
            "id": "5384"
        }, {
            "name": "Donna Snider",
            "position": "Customer Support",
            "salary": "$112,000",
            "start_date": "2011/01/25",
            "office": "New York",
            "id": "4226"
        }],
        column_map = {
            'name': 'Name',
            'position': 'Position',
            'salary': 'Salary',
            'start_date': 'Start Date',
            'office': 'Office',
            'id': 'ID'
        }, inverse_column_map = {},
        table, colHeaders = ["Name", "Position", "Salary", "Start Date", "Office", "ID"],
        autosave = true,
        employees = new Employees(data),
        appView = new AppView(employees),
        columns = [];


        for(key in column_map){
            columns.push({data: key, title: column_map[key]});
            inverse_column_map[column_map[key]] = key;
        }

        columns.push( {
            "data": null,
            "defaultContent": "<button class='edit'>Edit</button><button class='done'>Done</button>"
        });


    table = $('#datatable').DataTable({
        data: employees.toJSON(),
        fnCreatedRow: function(nRow, aData, iDataIndex) {
            $(nRow).attr('id', aData.id); // or whatever you choose to set as the id
        },
        columns: columns
    });

    var hot = new Handsontable($('#grid')[0], {
        data: employees.toJSON(),
        colHeaders: colHeaders,
         colWidths: $(window).width()/colHeaders.length * .98,
        contextMenu: true,
        afterChange: function(changes, source) {
            var arr = [],
                cols = ["name", "position", "salary", "start_date", "office", "id"],
                data;
            if (!changes) {
                return;
            }

            for (var i = 0; i < changes.length; i++) {
                data = arrayToObj(hot.getDataAtRow(changes[i][0]), cols);
                arr.push({
                    data: data,
                    key: changes[i][1],
                    val: changes[i][3]
                });
            }
            Backbone.pubSub.trigger('change', arr, 'handsontable');
        }
    });
    $('#edit').on('click', function() {
        $('#grid').show();
        $('#datatable_wrapper').hide();
    });

    $('#done').on('click', function() {
        $('#grid').hide();
        $('#datatable_wrapper').show();
    });

    $('#datatable tbody').on('click', '.edit', function() {
        var $this = $(this);
        $this.hide();
        $this.siblings('.done').show();

        $this.parent().siblings().each(function() {
            $(this).html('<input type="text" value="' + $(this).text() + '"/>');
        });
    }).on('click', '.done', function() {
        var $this = $(this);
        $this.hide();
        $this.siblings('.edit').show(),
            arr = [],
            data = table.row('#' + $this.parentsUntil('tr').parent().attr('id')).data();

        $this.parent().siblings().each(function() {
            var key = inverse_column_map[table.column($(this).index()).header().innerText],
                val = $(this).find('input').val();

            arr.push({
                data: data,
                key: key,
                val: val
            });
            $(this).html(val);
        });
        Backbone.pubSub.trigger('change', arr, 'datatable');
    });

    function arrayOfArraysToObjArray(arr, keys) {
        var objArr = [],
            obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj = {};
            for (var j = 0; j < arr[i].length; j++) {
                obj[keys[j]] = arr[i][j];
            }
            objArr.push(obj);
        }
        return objArr;
    }

    function searchHandsonTable(query, column){
        var results = [];
        hot.search.query(query, function(instance, row, col, value, result){
            if(col == column){
                results.push({instance: instance, row: row, col: col, value: value, result: result});
            }
        });
        return results;
    }

    function searchResultCounter(instance, row, col, value, result) {
    Handsontable.Search.DEFAULT_CALLBACK.apply(this, arguments);

    if (result) {
      searchResultCount++;
    }
  }

    function objArrayTo2DArray(objArr) {
        var arr = [];

        for (var key in objArr) {
            arr.push(objArr[key]);
        }

        return arr;
    }

    function arrayToObj(arr, keyArr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[keyArr[i]] = arr[i];
        }
        return obj;
    }

    function objToArray(obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(obj[key]);
        }
        return arr;
    }

});
