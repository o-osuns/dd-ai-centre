(function ($) {

	"use strict";

	// =====================================================
	// PRELOADER
	// =====================================================
	$(window).on("load", function () {
		'use strict';
		$('[data-loader="circle-side"]').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
		var $hero = $('.hero-home .content');
		var $hero_v = $('#hero_video .content ');
		$hero.find('h3, p, form').addClass('fadeInUp animated');
		$hero.find('.btn-1').addClass('fadeIn animated');
		$hero_v.find('.h3, p, form').addClass('fadeInUp animated');
		$(window).scroll();
	})

	// =====================================================
	// BACK TO TOP BUTTON
	// =====================================================
	function scrollToTop() {
		$('html, body').animate({
			scrollTop: 0
		}, 500, 'easeInOutExpo');
	}

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('#toTop').fadeIn('slow');
		} else {
			$('#toTop').fadeOut('slow');
		}
	});

	$('#toTop').on('click', function () {
		scrollToTop();
		return false;
	});

	// =====================================================
	// NAVBAR
	// =====================================================
	$(window).on('scroll load', function () {

		if ($(window).scrollTop() >= 1) {
			$('.main-header').addClass('active');
		} else {
			$('.main-header').removeClass('active');
		}

	});

	// Sticky nav
	$('.sticky-nav').stick_in_parent({
		offset_top: 0
	});

	// =====================================================
	// STICKY SIDEBAR SETUP
	// =====================================================
	$('#mainContent, #sidebar').theiaStickySidebar({
		additionalMarginTop: 90,
		updateSidebarHeight: false,
	});

	// =====================================================
	// ISOTOPE FILTERING
	// =====================================================

	// Quick search regex
	var qsRegex;
	var filterValue;

	var $grid = $('.grid').isotope({
		itemSelector: '.isotope-item',
		getSortData: {
			name: '.name',
			value: function (itemElem) { // function
				var value = $(itemElem).find('.number').text();
				return parseFloat(value.replace(/\D/g, ''));
			}
		},
		filter: function () {
			var $this = $(this);
			var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
			var selectResult = filterValue ? $this.is(filterValue) : true;
			return searchResult && selectResult;
		}
	});

	// Bind filter on select change
	$('#category').on('change', function () {
		// Get filter value from option value
		filterValue = $(this).val();
		$grid.isotope();
	});

	// Use value of search field to filter
	var $quicksearch = $('#search').keyup(debounce(function () {
		qsRegex = new RegExp($quicksearch.val(), 'gi');
		$grid.isotope();
	}));

	// Debounce so filtering doesn't happen every millisecond
	function debounce(fn, threshold) {
		var timeout;
		return function debounced() {
			if (timeout) {
				clearTimeout(timeout);
			}
			function delayed() {
				fn();
				timeout = null;
			}
			setTimeout(delayed, threshold || 100);
		};
	}

	// Reset filters
	$('.isotope-reset').on('click', function () {

		qsRegex = '';
		filterValue = '';

		$('#search').val('');
		$('#category').prop('selectedIndex', 0).niceSelect('update');

		$grid.isotope();

	});

	// =====================================================
	// ISOTOPE SORTING
	// =====================================================
	$('#categorySort').on('change', function () {

		// Get filter value from option value
		var sortValue = $(this).val();

		// Sorting by name asc
		if (sortValue == 'sortByNameAsc') {
			$grid.isotope({
				sortBy: 'name',
				sortAscending: true
			});
		}
		// Sorting by value asc
		if (sortValue == 'sortByValueAsc') {
			// Start with lowest number from top to bottom
			$grid.isotope({
				sortBy: 'value',
				sortAscending: true
			});
		}
		// Sorting by value desc
		if (sortValue == 'sortByValueDesc') {
			// Start with highest number from top to bottom
			$grid.isotope({
				sortBy: 'value',
				sortAscending: false
			});
		}
		// Sorting by original order
		if (sortValue == 'sortById') {
			$grid.isotope({
				sortBy: 'original-order',
				sortAscending: true
			});
		}

	});

	// =====================================================
	// MOBILE MENU
	// =====================================================
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black", "theme-dark"], // "theme-dark" can be changed to: "theme-white"
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{
			position: 'bottom',
			content: ['<a href="#">© 2024 Esty</a>']
		}]
	}, {
		// configuration
		clone: true,
	});
	var $icon = $("#hamburger");
	var API = $menu.data("mmenu");
	$icon.on("click", function () {
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});

	// =====================================================
	// MODAL
	// =====================================================
	function activateModal() {

		$('.modal-opener').magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			fixedBgPos: true,
			closeOnBgClick: false,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 100,
			mainClass: 'my-mfp-zoom-in'
		});

		// Format money
		formatMoneyInInsertModal();
	}

	// Close
	$('.btn-modal-close').on('click', function () {

		$.magnificPopup.close();

	});

	// =====================================================
	// EDIT LINKS
	// =====================================================
	function activateEditLinks() {

		$('.edit-link').on('click', function (e) {

			// Get actual values from the DOM
			var idUpdate = $(this).attr('data-id');
			var expenseNameUpdate = $(this).attr('data-expense-name');
			var expenseValueUpdate = $(this).attr('data-expense-value');

			// Fill the modal window
			$('#expenseId').val(idUpdate);
			$('#expenseNameUpdate').val(expenseNameUpdate);
			$('#expenseValueUpdate').val(expenseValueUpdate);

			// Format money
			formatMoneyInUpdateModal();
		});

	}

	// =====================================================
	// EDIT USER DATA LINKS
	// =====================================================
	function activateUserDataLink() {

		$('.edit-user-link').on('click', function (e) {

			// Get actual values from the DOM			
			var userNameUpdate = $(this).attr('data-username');
			var emailUpdate = $(this).attr('data-email');

			// Fill the modal window
			$('#username').val(userNameUpdate);
			$('#email').val(emailUpdate);

		});

	}

	// =====================================================
	// DROPDOWNS
	// =====================================================
	$('#category').niceSelect();
	$('#categorySort').niceSelect();

	// =====================================================
	// FORMS, LABELS
	// =====================================================	
	/* Home */
	$('#expenseName').attr('autocomplete', 'off');
	$('#expenseValue').attr('autocomplete', 'off');
	$('#expenseNameUpdate').attr('autocomplete', 'off');
	$('#expenseValueUpdate').attr('autocomplete', 'off');
	$('#search').attr('autocomplete', 'off');
	/* Profile */
	$('#username').attr('autocomplete', 'off');
	$('#email').attr('autocomplete', 'off');

	new FloatLabels('#addExpenseForm', {
		style: 2
	});

	new FloatLabels('#updateExpenseForm', {
		style: 2
	});

	new FloatLabels('#updateUserDataForm', {
		style: 2
	});

	// =====================================================
	// SWITCHES
	// =====================================================

	// Transform a particular checkbox to switch with switchery plugin
	function activateSwitch(id) {

		var newlyInsertedCbxElement = document.querySelector('[data-id="' + id + '"].js-switch');
		new Switchery(newlyInsertedCbxElement, {
			size: 'small',
			color: '#48E0A4'
		});

		// Event handling when the newly inserted switch is changed
		newlyInsertedCbxElement.onchange = function () {

			if (newlyInsertedCbxElement.checked) {

				removeSummaryInfoText();
				$('#' + $(this).attr('data-id')).removeClass('pending').addClass('completed');
				markCompletedItems();
				putCheckedItemToSummary($(this).attr('data-id'), $(this).attr('data-expense-name'), $(this).attr('data-expense-value'));
				showElementAddedMessage();
				calculateSummary();

			}
			if (!newlyInsertedCbxElement.checked) {

				$('#' + $(this).attr('data-id')).removeClass('completed').addClass('pending');
				unmarkPendingItems();
				removeBalanceListItem($(this).attr('data-id'))
				showElementIsRemovedMessage();
				calculateSummary();

			}

		};

	}

	// Transform all checkboxes to swithces with switchery plugin
	var elems = Array.prototype.slice.call($('.js-switch'));
	elems.forEach(function (html) {
		new Switchery(html, {
			size: 'small',
			color: '#48E0A4'
		});
	});

	// Event handling when switch is changed
	elems.forEach(function (elem) {

		elem.onchange = function () {

			if (elem.checked) {

				removeSummaryInfoText();
				$('#' + $(this).attr('data-id')).removeClass('pending').addClass('completed');
				markCompletedItems();
				putCheckedItemToSummary($(this).attr('data-id'), $(this).attr('data-expense-name'), $(this).attr('data-expense-value'));
				showElementAddedMessage();
				calculateSummary();

			}
			if (!elem.checked) {

				$('#' + $(this).attr('data-id')).removeClass('completed').addClass('pending');
				unmarkPendingItems();
				removeBalanceListItem($(this).attr('data-id'))
				showElementIsRemovedMessage();
				calculateSummary();

			}

		};

	});

	// =====================================================
	// REMOVE ELEMENTS FROM SUMMARY PANEL
	// =====================================================
	$('.summary-body').delegate('.sum-item-remove-icon', 'click', function () {

		removeBalanceListItem($(this).attr('data-balance-id'));
		$('[data-id="' + $(this).attr('data-balance-id') + '"].js-switch').click();

	});


	// =====================================================
	// FORMATTING CURRENCY
	// =====================================================
	var prefixSetting = '$ ';
	var suffixSetting = '';
	var thousandsSeparatorSetting = ',';
	var centsSeparatorSetting = '.';
	var centsLimitSetting = 2;

	function formatMoney() {
		$('.money-format').priceFormat({
			prefix: prefixSetting,
			suffix: suffixSetting,
			thousandsSeparator: thousandsSeparatorSetting,
			centsSeparator: centsSeparatorSetting,
			centsLimit: centsLimitSetting,
			allowNegative: true
		});
	}

	function formatMoneyInInsertModal() {
		$('#expenseValue').priceFormat({
			prefix: prefixSetting,
			suffix: suffixSetting,
			thousandsSeparator: thousandsSeparatorSetting,
			centsSeparator: centsSeparatorSetting,
			centsLimit: centsLimitSetting,
		});
	}

	function formatMoneyInUpdateModal() {
		$('#expenseValueUpdate').priceFormat({
			prefix: prefixSetting,
			suffix: suffixSetting,
			thousandsSeparator: thousandsSeparatorSetting,
			centsSeparator: centsSeparatorSetting,
			centsLimit: centsLimitSetting,
		});
	}

	function unFormatMoney() {

		$('.money-format').each(function () {
			var strWithNumbersOnly = $(this).text().replace(/\D/g, '');
			$(this).text(strWithNumbersOnly);
		});

	}

	// =====================================================
	// HELPER FUNCTIONS
	// =====================================================
	function markCompletedItems() {
		$('.completed').each(function () {
			$(this).find('span.money-format').addClass('item-value-cross-out');
		});
	}

	function unmarkPendingItems() {
		$('.pending').each(function () {
			$(this).find('span.money-format').removeClass('item-value-cross-out');
		});
	}

	function showDeletedMessage() {

		$('#deleteMessage').fadeIn('slow', function () {
			$('#deleteMessage').delay(1000).fadeOut('slow');
		});

	}

	function showElementAddedMessage() {

		$('#elementAddedMessage').fadeIn('slow', function () {
			$('#elementAddedMessage').delay(1000).fadeOut('slow');
		});

	}

	function showElementIsRemovedMessage() {

		$('#elementRemovedMessage').fadeIn('slow', function () {
			$('#elementRemovedMessage').delay(1000).fadeOut('slow');
		});

	}

	function showListIsCopiedMessage() {

		$('#listIsCopiedMessage').fadeIn('slow', function () {
			$('#listIsCopiedMessage').delay(1000).fadeOut('slow');
		});

	}

	function showSuccessMessageInModal(msg) {

		$('.success-message-in-modal').text(msg)
		$('.success-message-in-modal').fadeIn('slow', function () {
			$('.success-message-in-modal').delay(1000).fadeOut('slow');
		});

	}

	function showErrorMessageInModal(msg) {

		$('.error-message-in-modal').text(msg);
		$('.error-message-in-modal').fadeIn('slow', function () {
			$('.error-message-in-modal').delay(1000).fadeOut('slow');
		});

	}

	function putCheckedItemToSummary(id, name, value) {

		var htmlBlock = '<div data-balance-id="' + id + '" class="row"><div class="col-6"><a href="javascript:;" class="sum-item-remove-icon" data-balance-id="' + id + '" data-balance-name="' + name + '" data-balance-value="' + value + '"><i class="fa fa-times-circle"></i></a><span class="sum-item-name">' + name + '</span></div><div class="col-6 money-container balance"><span class="money-format">' + value + '</span></div></div>';
		$('#balanceList').append(htmlBlock);

	}

	function removeBalanceListItem(id) {

		$('div[data-balance-id="' + id + '"]').remove();
		calculateSummary();

	}

	function updateBalanceListItem(id, name, value) {

		$('div[data-balance-id="' + id + '"] span').text(name);
		$('div[data-balance-id="' + id + '"] span.money-format').text(value);
		calculateSummary();

	}

	function removeSummaryInfoText() {

		$('#summaryInfoText').remove();

	}

	function setSummaryInfoText() {

		$('#balanceList').append('<span id="summaryInfoText"></span>');
		$('#summaryInfoText').text('There is no item to calculate! Please add some!');

	}

	function showOrderGenerationLink() {
		$('#generateOrderLink').show();
	}

	function hideOrderGenerationLink() {
		$('#generateOrderLink').hide();
	}

	// =====================================================
	// ONLY DEMO: DELETE THIS BLOCK IN FULL VERSION
	// =====================================================
	function showDemoLimitMessage() {

		$('#demoLimitMessage').fadeIn('slow', function () {
			$('#demoLimitMessage').delay(3000).fadeOut('slow');
		});

	}
	function showDemoLimitMessageDelete() {

		$('#demoLimitMessageDelete').fadeIn('slow', function () {
			$('#demoLimitMessageDelete').delay(3000).fadeOut('slow');
		});

	}
	// =====================================================
	// ONLY DEMO END
	// =====================================================

	// =====================================================
	// CALCULATOR
	// =====================================================
	function calculateSummary() {

		// Before calculation: unformat money
		unFormatMoney();

		// Variables for calculation
		var balanceSummary = 0;
		var total = 0;

		// Sum of all balances
		$('.balance').each(function () {
			// Get each balance value and update balanceSummary
			balanceSummary = balanceSummary + ($('span', this).text() * 1);
		});

		// Total
		total = (balanceSummary * 1);
		$('#budget').text(total);

		// After calculation: format money
		formatMoney();

		// After calculation: show order generation link
		showOrderGenerationLink();

		// Info text handling
		if (total == 0) {
			setSummaryInfoText();
			hideOrderGenerationLink();
		}

	}

	// =====================================================
	// AJAX INSERT
	// =====================================================
	$('#addModal .btn-modal-save').on('click', function (e) {

		// Block the insert if there are more than 15 items	
		if ($('#expenseList').children().length >= 15) {
			$('#addExpenseForm').trigger('reset');
			$.magnificPopup.close();
			showDemoLimitMessage();
		} else {

			e.preventDefault();

			function insertExpenseWithAjax() {

				// Send data with ajax
				$.ajax({
					data: {
						action: 'addExpense',
						expenseName: $('#expenseName').val(),
						expenseValue: $('#expenseValue').val(),
						expenseType: $('#expenseType').val()
					},
					type: "POST",
					url: "functions.php",
					success: function (response) {

						if (response == 'Fill the (*) inputs') {

							// If name or expense are not filled
							showErrorMessageInModal(response);

						} else if (response == 'Name already exists') {

							// If the expense name already exists in DB
							showErrorMessageInModal(response);

						} else {

							// Show success message
							showSuccessMessageInModal('Saved successfully');

							// Extend the item list on the UI
							$('#expenseList').append(response);

							// Reload items because of filtering
							$grid.isotope('reloadItems').isotope();
							$grid.isotope('updateSortData').isotope();

							// Re-Init because DOM was changed
							activateModal();
							activateEditLinks();
							activateSwitch($(response).attr('id'));
							calculateSummary();

						}

					}
				});

			}
			insertExpenseWithAjax();

		}

	});

	// =====================================================
	// AJAX UPDATE
	// =====================================================
	$('#updateModal .btn-modal-update').on('click', function (e) {

		e.preventDefault();

		// Get expense type from radio select
		if ($('#updateExpenseForm :radio[value="fixed"]').is(':checked')) {
			$('#expenseTypeUpdate').val('fixed');
		} else {
			$('#expenseTypeUpdate').val('other');
		}

		// Send data with ajax
		$.ajax({
			data: {
				action: 'updateExpense',
				expenseId: $('#expenseId').val(),
				expenseNameUpdate: $('#expenseNameUpdate').val(),
				expenseValueUpdate: $('#expenseValueUpdate').val(),
				expenseTypeUpdate: $('#expenseTypeUpdate').val(),
			},
			type: "POST",
			url: "functions.php",
			success: function (response) {

				if (response == 'Fill the (*) inputs') {

					// If name or expense are not filled
					showErrorMessageInModal(response);

				} else if (response == 'Name already exists') {

					// If the expense name already exists in DB
					showErrorMessageInModal(response);

				} else {

					// Show success message
					showSuccessMessageInModal('Updated successfully');

					// Get actual values from the response
					var idUpdateResp = $(response).attr('data-id');
					var expenseNameUpdateResp = $(response).attr('data-expense-name');
					var expenseValueUpdateResp = $(response).attr('data-expense-value');

					// Edit the updated grid item link data
					$('a[data-id="' + idUpdateResp + '"]').text(expenseNameUpdateResp);
					$('a[data-id="' + idUpdateResp + '"]').attr('data-expense-name', expenseNameUpdateResp);
					$('a[data-id="' + idUpdateResp + '"]').attr('data-expense-value', expenseValueUpdateResp);
					$('#' + idUpdateResp).find('span.money-format').text(expenseValueUpdateResp);

					// Edit the updated grid item switch data					
					$('[data-id="' + idUpdateResp + '"].js-switch').attr('data-expense-name', expenseNameUpdateResp);
					$('[data-id="' + idUpdateResp + '"].js-switch').attr('data-expense-value', expenseValueUpdateResp);

					// Reload items because of sorting				
					$grid.isotope('updateSortData').isotope();

					// Re-Init because DOM was changed				
					activateModal();
					activateEditLinks();
					updateBalanceListItem(idUpdateResp, expenseNameUpdateResp, expenseValueUpdateResp);
					calculateSummary();

				}
			}
		});

	});

	$('#updateUserDataModal .btn-modal-update').on('click', function (e) {

		e.preventDefault();

		// Send data with ajax
		$.ajax({
			data: {
				action: 'updateUserData',
				username: $('#username').val(),
				email: $('#email').val(),
				npassword: $('#npassword').val(),
				cpassword: $('#cpassword').val()
			},
			type: "POST",
			url: "functions.php",
			success: function (response) {

				if (response == 'Fill the (*) inputs') {

					showErrorMessageInModal(response);

				} else if (response == 'Email is NOT valid!') {

					showErrorMessageInModal(response);

				} else if (response == 'Username is NOT valid!') {

					showErrorMessageInModal(response);

				} else if (response == 'Password length is NOT valid!') {

					showErrorMessageInModal(response);

				} else if (response == 'Passwords do not match!') {

					showErrorMessageInModal(response);

				} else {

					// Show success message
					showSuccessMessageInModal('Updated successfully');

					// Get actual values from the response
					var userNameUpdateResp = $(response).attr('data-username');
					var emailUpdateResp = $(response).attr('data-email');

					// Update user data on edit link					
					$('#editUserDataLink').attr('data-username', userNameUpdateResp);
					$('#editUserDataLink').attr('data-email', emailUpdateResp);

					// Update user profile data
					$('#usernameSpan').text(userNameUpdateResp);
					$('#emailSpan').text(emailUpdateResp);

				}

			}
		});

	});

	// =====================================================
	// AJAX DELETE
	// =====================================================
	function removeGridItem(id) {
		$('#' + id).remove();
	}
	$('#updateModal .btn-modal-delete').on('click', function (e) {

		// Block the delete if there are less than 5 items	
		if ($('#expenseList').children().length <= 5) {
			$('#addExpenseForm').trigger('reset');
			$.magnificPopup.close();
			showDemoLimitMessageDelete();
		} else {

			e.preventDefault();

			var idDelete = $('#expenseId').val();

			// Send data with ajax
			$.ajax({
				data: {
					action: 'deleteExpense',
					expenseId: $('#expenseId').val()
				},
				type: "POST",
				url: "functions.php",
				success: function (response) {

					// Close the modal
					$.magnificPopup.close();

					// Show success message after mdal is closed
					if (!$.magnificPopup.instance.isOpen) {

						// Show successfully deleted message
						showDeletedMessage();

					}

					// Remove item from the list
					removeGridItem(idDelete);

					// Reload grid items
					$grid.isotope('reloadItems').isotope();

					// Re-Init because DOM was changed				
					activateModal();
					activateEditLinks();
					removeBalanceListItem(idDelete);
					calculateSummary();


				}
			});

		}

	});

	// =====================================================
	// GENERATE ORDER
	// =====================================================
	function fillTheHiddenTextAreaWithOrder() {

		$('div[data-balance-id]').each(function () {

			$('#orderMessage').append($('span.sum-item-name', this).text() + ' : ' + $('span.money-format', this).text() + '\n');

		});
		$('#orderMessage').append('--------------------' + '\n');
		$('#orderMessage').append('TOTAL COSTS: ' + $('#budget').text());

	}
	function copyToClipboard(elementId) {
		var textarea = document.getElementById(elementId);
		if (navigator.clipboard) {
			navigator.clipboard.writeText(textarea.value)
				.then(() => {

					showListIsCopiedMessage();


				})
				.catch(err => {
					console.error('Unable to copy text to clipboard', err);
				});
		} else {
			console.error('Clipboard API not supported');
		}
	}

	$('#generateOrderLink').on('click', function () {

		$('#orderMessage').text('');
		fillTheHiddenTextAreaWithOrder();
		copyToClipboard('orderMessage');

	});

	// =====================================================
	// INIT
	// =====================================================	
	markCompletedItems();
	activateModal();
	activateEditLinks();
	activateUserDataLink();
	calculateSummary();


})(window.jQuery);