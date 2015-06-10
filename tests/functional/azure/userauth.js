define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'intern/dojo/node!leadfoot/Command'
], function (registerSuite, assert, require, Command) {
    registerSuite({
        name: 'index-userauth',
        
        // before the suite starts
        'MANUAL': function () {
            //try {
                // we are coming from an uncleaned state
                
                return this.remote
                .setFindTimeout(5000)
                .findById('logout_modal0')
                    .click()
                    .end();
            //}catch (e){
            //    console.log("ISSUE: ALREADY LOGGED IN!");
            //    console.log("PLease fix this, this should not happen.")    ;
            //}
            //
            //return this.remote
            //    .get(require.toUrl('http://brutto-netto-rechner.appspot.com'));
        },
        
        //GetStartState

        //Register User1
        //logout User1
        //Register User2
        //logout User2
        
        // TESTPHASE 1
        //login User1
        'LOGIN_User1': function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findById('username')
                    .click()
                    .type('test_User1')
                    .end()
                .findById('password')
                    .click()
                    .type('123456')
                    .pressKeys('\uE007') // enter key
                    .end();
        },

        //manipulate savevalue A
        'manipulate1A': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('1000')
                    .pressKeys('\uE007')
                    .end();
        },
        //save value A [for User 1] 
        'saveFile1A': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('filename').click()
                .clearValue()
                .type("test_User1_A")
                .end()
                .sleep(500)
                .findById('saveresult')
                .click()
                .end()
                .sleep(5000);
        },
        
        //manipulate savevalue B
        'manipulate1B': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('2000')
                    .pressKeys('\uE007')
                    .end();
        },
        //save value B [for User 1] 
        'saveFile1B': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('filename').click()
                .clearValue()
                .type("test_User1_B")
                .end()
                .sleep(500)
                .findById('saveresult')
                .click()
                .end()
                .sleep(5000);
        },

        //manipulate savevalue C
        'manipulate1C': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('3000')
                    .pressKeys('\uE007')
                    .end();
        },

        //save value C [for User 1] 
        'saveFile1C': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('filename').click()
                .clearValue()
                .type("test_User1_C")
                .end()
                .sleep(500)
                .findById('saveresult')
                .click()
                .end()
                .sleep(5000);
        },

        //manipulate savevalue D
        'manipulate1D': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('4000')
                    .pressKeys('\uE007')
                    .end();
        },
        
        //save value D [for User 1] 
        'saveFile1D': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('filename').click()
                .clearValue()
                .type("test_User1_D")
                .end()
                .sleep(500)
                .findById('saveresult')
                .click()
                .end()
                .sleep(5000);
        },

        // Share FileA for User2 value 0
        'retrieveFilesA': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .end()
                .sleep(5000)
            .findById('sharetest_User1_A')
                .click()
                .end()
                .sleep(500)
            .findById('share-file-username')    
                .clearValue()
                .type("test_User2")
                .end()
                .sleep(500)
            .findById('share-file-permission')
                .click()
                .end()
                .sleep(500)
            .findById('option-0')
                .click()
                .end()
                .sleep(500)
            .findById('share-file')
                .click()
                .end()
                .sleep(5000);
        },

        // Share FileB for User2 value 2
        'retrieveFilesB': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .end()
                .sleep(5000)
            .findById('sharetest_User1_B')
                .click()
                .end()
                .sleep(5000)
            .findById('share-file-username')    
                .clearValue()
                .type("test_User2")
                .end()
                .sleep(500)
            .findById('share-file-permission')
                .click()
                .end()
                .sleep(500)
            .findById('option-2')
                .click()
                .end()
                .sleep(500)
            .findById('share-file')
                .click()
                .end()
                .sleep(5000);
        },

        // Share FileC for User2 value 4
        'retrieveFilesC': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .end()
                .sleep(5000)
            .findById('sharetest_User1_C')
                .click()
                .end()
                .sleep(5000)
            .findById('share-file-username')    
                .clearValue()
                .type("test_User2")
                .end()
                .sleep(500)
            .findById('share-file-permission')
                .click()
                .end()
                .sleep(500)
            .findById('option-4')
                .click()
                .end()
                .sleep(500)
            .findById('share-file')
                .click()
                .end()
                .sleep(5000);
        },

        // Share FileD for User2 value 6
        'retrieveFilesD': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .end()
                .sleep(5000)
            .findById('sharetest_User1_D')
                .click()
                .end()
                .sleep(5000)
            .findById('share-file-username')    
                .clearValue()
                .type("test_User2")
                .end()
                .sleep(500)
            .findById('share-file-permission')
                .click()
                .end()
                .sleep(500)
            .findById('option-6')
                .click()
                .end()
                .sleep(500)
            .findById('share-file')
                .click()
                .end()
                .sleep(5000);
        },

        
        //logout User2
        'LOGOUT_User1': function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findById('logout_modal0')
                    .click()
                    .end();
        },
        
        // TESTPHASE 2
        //login User1
        'LOGIN_User2': function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findById('username')
                    .click()
                    .type('test_User2')
                    .end()
                .findById('password')
                    .click()
                    .type('123456')
                    .pressKeys('\uE007') // enter key
                    .end();
        },

        // Share FileD for User2 value 6
        //check files if correct values are now present
        'retrieveFiles2': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .sleep(3000)
                .end()
                .sleep(3000)
            .findById('loadtest_User1_C')
            .click()
            .sleep(3000)
            .end()
            .findById('shared_widgets_NumberInput_2')
            .getVisibleText()
            .then(function (text) {
                assert.strictEqual(text, '1.877,23',
                    'This value should be 1.877,23');
            })
            .end() 
            .findById('loadresult')
                .click()
                .sleep(3000)
                .end()
            .sleep(3000)
            .findById('loadtest_User1_D')
            .click()
            .sleep(3000)
            .end()
            .findById('shared_widgets_NumberInput_2')
            .then(function (text) {
                assert.strictEqual(text, '2.348,37',
                    'This value should be 2.348,37');
            })
            .end()
            //there may be no A or B
            .sleep(1000);
        },

        //manipulate savevalue B
        //save value B [for User 1]
        //manipulate savevalue B
        'manipulate2B': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('6000')
                    .pressKeys('\uE007')
                    .end();
        },
        //save value B [for User 1] 
        'saveFile2B': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('savetest_User1_B')
                .click()
                .end()
                .sleep(5000);
        },


        //manipulate savevalue D
        //save value D [for User 1] 
        //check if correct values are now stored
        'manipulate2B': function () {
            return this.remote
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('6000')
                    .pressKeys('\uE007')
                    .end();
        },
        //save value B [for User 1] 
        'saveFile2B': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(500)
                .findById('savetest_User1_D')
                .click()
                .end()
                .sleep(5000);
        },
        
        // Share FileD for User2 value 6
        //check files if correct values are now present
        'retrieveFiles3': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
                .click()
                .sleep(3000)
            .end()
            .findById('loadtest_User1_D')
            .click()
            .sleep(3000)
            .end()
            .findById('shared_widgets_NumberInput_2')
            .then(function (text) {
                assert.strictEqual(text, '3.261,49',
                    'This value should be 3.261,49');
            })
            .end()
            //there may be no A or B
            .sleep(1000);
        },

        ///logout User2
        'LOGOUT_User2': function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findById('logout_modal0')
                    .click()
                    .end();
        },
        
        //TODO cleanUp files

        //delete account User1 User2

    });
});




