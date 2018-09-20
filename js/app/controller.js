angular

    .module('app', ['ngMaterial'])

    .config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome):|data:image\//);
        }
    ])

    .controller("ctrl", function () {
        var vm = this;

        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

            vm.ticketLink = tabs[0].url;

            const urlRegExp = /https:\/\/jira\.miohq\.com\/browse\/\D+-\d+/;

            if (vm.ticketLink.match(urlRegExp)) {
                const title = tabs[0].title;

                const titleRegExp = /\[([^)]+)]/;
                const key = titleRegExp.exec(title)[1];
                const header = title.replace(titleRegExp.exec(title)[0], '').replace('- Miovision Jira', '').trim();

                const branchName = header.replace(/(\s|-)+/g, '-').replace(/[^0-9A-Z\-]+/gi, "").toLowerCase();

                vm.branchInfo = key + '-' + branchName;
                vm.commitInfo = key + ' ' + header;

                vm.pageValid = true;
            } else {
                vm.pageValid = false;
            }

        });

        vm.copyAsBranchInfo = function () {
            const input = document.getElementById("branch-info-content");
            input.focus();
            document.execCommand('SelectAll');
            document.execCommand("Copy", false, null);
        };

        vm.copyAsCommitInfo = function () {
            const input = document.getElementById("commit-info-content");
            input.focus();
            document.execCommand('SelectAll');
            document.execCommand("Copy", false, null);
        };

        vm.copyTicketLink = function () {
            const input = document.getElementById("ticket-link");
            input.focus();
            document.execCommand('SelectAll');
            document.execCommand("Copy", false, null);
        };
    });




