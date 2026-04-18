(function () {
    'use strict';

    var orderPage = 1;
    var orderTotalPages = 1;
    var orderSearchDebounce = null;
    var noteProductsCache = [];

    var ORDER_STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'];

    function esc(value) {
        if (typeof escapeHtml === 'function') return escapeHtml(String(value || ''));
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getToken() {
        return localStorage.getItem('codelens-token');
    }

    function setMsg(id, text, type) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('success', 'error');
        el.textContent = text || '';
        if (text && type) el.classList.add(type);
    }

    function normalizeText(value) {
        return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function formatMoney(value) {
        var amount = Number(value || 0);
        if (!Number.isFinite(amount)) amount = 0;
        return 'Rs ' + amount.toFixed(0);
    }

    function refreshIcons(root) {
        if (window.lucide) {
            lucide.createIcons(root ? { rootElement: root } : undefined);
        }
    }

    function resetNoteForm() {
        var idEl = document.getElementById('noteProductId');
        var titleEl = document.getElementById('noteProductTitle');
        var langEl = document.getElementById('noteProductLanguage');
        var priceEl = document.getElementById('noteProductPrice');
        var descEl = document.getElementById('noteProductDescription');
        var activeEl = document.getElementById('noteProductActive');
        var saveBtn = document.getElementById('noteProductSaveBtn');

        if (idEl) idEl.value = '';
        if (titleEl) titleEl.value = '';
        if (langEl) langEl.value = 'C';
        if (priceEl) priceEl.value = '';
        if (descEl) descEl.value = '';
        if (activeEl) activeEl.checked = true;
        if (saveBtn) saveBtn.innerHTML = '<svg data-lucide="save"></svg> Save Note';

        setMsg('noteProductFormMsg', '', null);
        refreshIcons(saveBtn || undefined);
    }

    function fillNoteForm(note) {
        var idEl = document.getElementById('noteProductId');
        var titleEl = document.getElementById('noteProductTitle');
        var langEl = document.getElementById('noteProductLanguage');
        var priceEl = document.getElementById('noteProductPrice');
        var descEl = document.getElementById('noteProductDescription');
        var activeEl = document.getElementById('noteProductActive');
        var saveBtn = document.getElementById('noteProductSaveBtn');

        if (idEl) idEl.value = note.id;
        if (titleEl) titleEl.value = note.title || '';
        if (langEl) langEl.value = note.language || 'Other';
        if (priceEl) priceEl.value = Number(note.price || 0).toFixed(0);
        if (descEl) descEl.value = note.description || '';
        if (activeEl) activeEl.checked = !!note.isActive;
        if (saveBtn) saveBtn.innerHTML = '<svg data-lucide="save"></svg> Update Note';

        setMsg('noteProductFormMsg', 'Editing note: ' + (note.title || ''), 'success');
        refreshIcons(saveBtn || undefined);
    }

    async function loadNoteProducts() {
        var token = getToken();
        if (!token) return;

        var tbody = document.getElementById('noteProductsTableBody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Loading note products...</td></tr>';
        }

        try {
            var res = await smartFetch(API_URL + '/admin/note-products?includeInactive=true', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            var data = await res.json();

            if (!data.success) {
                if (tbody) tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Failed to load note products</td></tr>';
                return;
            }

            noteProductsCache = data.notes || [];
            renderNoteProducts(noteProductsCache);
        } catch (err) {
            if (tbody) tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Network error while loading note products</td></tr>';
        }
    }

    function renderNoteProducts(notes) {
        var tbody = document.getElementById('noteProductsTableBody');
        if (!tbody) return;

        if (!notes || notes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">No note products yet. Add one from the form above.</td></tr>';
            return;
        }

        var html = '';
        notes.forEach(function (note) {
            var statusClass = note.isActive ? 'enabled' : 'disabled';
            var updated = typeof formatDate === 'function' ? formatDate(note.updatedAt) : '—';

            html += '<tr>';
            html += '  <td>';
            html += '    <div><strong>' + esc(note.title) + '</strong></div>';
            html += '    <div class="orders-muted">' + esc(note.description || 'No description') + '</div>';
            html += '  </td>';
            html += '  <td>' + esc(note.language || 'Other') + '</td>';
            html += '  <td><strong>' + esc(formatMoney(note.price)) + '</strong></td>';
            html += '  <td>' + (note.isActive ? 'Active' : 'Inactive') + '</td>';
            html += '  <td>' + esc(updated) + '</td>';
            html += '  <td>';
            html += '    <button class="orders-edit-btn" data-note-edit="' + esc(note.id) + '">Edit</button>';
            html += '    <button class="orders-toggle-btn ' + statusClass + '" data-note-toggle="' + esc(note.id) + '" data-active="' + (note.isActive ? 'true' : 'false') + '">' + (note.isActive ? 'Disable' : 'Enable') + '</button>';
            html += '  </td>';
            html += '</tr>';
        });

        tbody.innerHTML = html;
    }

    async function submitNoteProductForm(event) {
        event.preventDefault();

        var token = getToken();
        if (!token) return;

        var idEl = document.getElementById('noteProductId');
        var titleEl = document.getElementById('noteProductTitle');
        var langEl = document.getElementById('noteProductLanguage');
        var priceEl = document.getElementById('noteProductPrice');
        var descEl = document.getElementById('noteProductDescription');
        var activeEl = document.getElementById('noteProductActive');
        var saveBtn = document.getElementById('noteProductSaveBtn');

        var noteId = idEl ? idEl.value : '';
        var title = normalizeText(titleEl ? titleEl.value : '');
        var language = normalizeText(langEl ? langEl.value : 'Other');
        var description = normalizeText(descEl ? descEl.value : '');
        var price = Number(priceEl ? priceEl.value : '');
        var isActive = !!(activeEl && activeEl.checked);

        if (title.length < 2 || title.length > 120) {
            setMsg('noteProductFormMsg', 'Title must be between 2 and 120 characters', 'error');
            return;
        }

        if (!Number.isFinite(price) || price < 1) {
            setMsg('noteProductFormMsg', 'Price must be at least 1', 'error');
            return;
        }

        if (description.length > 400) {
            setMsg('noteProductFormMsg', 'Description cannot exceed 400 characters', 'error');
            return;
        }

        var isEdit = !!noteId;
        var url = API_URL + '/admin/note-products' + (isEdit ? '/' + noteId : '');
        var method = isEdit ? 'PATCH' : 'POST';

        var payload = {
            title: title,
            language: language,
            description: description,
            price: price,
            isActive: isActive
        };

        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<svg data-lucide="loader"></svg> Saving...';
            refreshIcons(saveBtn);
        }

        setMsg('noteProductFormMsg', '', null);

        try {
            var res = await smartFetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            });
            var data = await res.json();

            if (!data.success) {
                setMsg('noteProductFormMsg', data.message || 'Failed to save note product', 'error');
                return;
            }

            setMsg('noteProductFormMsg', data.message || 'Saved successfully', 'success');
            resetNoteForm();
            await loadNoteProducts();
        } catch (err) {
            setMsg('noteProductFormMsg', 'Network error while saving note product', 'error');
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<svg data-lucide="save"></svg> Save Note';
                refreshIcons(saveBtn);
            }
        }
    }

    async function toggleNoteStatus(noteId, shouldEnable) {
        var token = getToken();
        if (!token) return;

        try {
            var res = await smartFetch(API_URL + '/admin/note-products/' + noteId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ isActive: shouldEnable })
            });
            var data = await res.json();
            if (!data.success) {
                setMsg('noteProductFormMsg', data.message || 'Failed to update note status', 'error');
                return;
            }

            setMsg('noteProductFormMsg', data.message || 'Note status updated', 'success');
            await loadNoteProducts();
        } catch (err) {
            setMsg('noteProductFormMsg', 'Network error while updating note status', 'error');
        }
    }

    function renderOrders(orders) {
        var tbody = document.getElementById('adminOrdersTableBody');
        if (!tbody) return;

        if (!orders || !orders.length) {
            tbody.innerHTML = '<tr><td colspan="8" class="table-empty">No orders found for selected filters.</td></tr>';
            return;
        }

        var html = '';
        orders.forEach(function (order) {
            var notesHtml = '<div class="orders-notes-list">';
            (order.notes || []).forEach(function (item) {
                notesHtml += '<div class="orders-note-line"><strong>' + esc(item.title || 'Untitled') + '</strong> x' + esc(item.quantity) + ' <span class="orders-muted">(' + esc(formatMoney(item.unitPrice)) + ')</span></div>';
            });
            notesHtml += '</div>';

            var statusHtml = '<select class="orders-status-select">';
            ORDER_STATUSES.forEach(function (status) {
                var selected = status === order.status ? ' selected' : '';
                var label = status.replace(/_/g, ' ').replace(/\b\w/g, function (ch) { return ch.toUpperCase(); });
                statusHtml += '<option value="' + esc(status) + '"' + selected + '>' + esc(label) + '</option>';
            });
            statusHtml += '</select>';

            html += '<tr data-order-id="' + esc(order.id) + '">';
            html += '  <td>';
            html += '    <div><strong>' + esc(order.customerName) + '</strong></div>';
            html += '    <div class="orders-muted">' + esc(order.paymentMethod || 'COD') + '</div>';
            html += '  </td>';
            html += '  <td>';
            html += '    <div>' + esc(order.email) + '</div>';
            html += '    <div class="orders-muted">' + esc(order.phone) + '</div>';
            html += '  </td>';
            html += '  <td>';
            html += '    <div>' + esc(order.city) + ', ' + esc(order.state) + '</div>';
            html += '    <div class="orders-muted">PIN ' + esc(order.pincode || '') + '</div>';
            html += '  </td>';
            html += '  <td>' + notesHtml + '</td>';
            html += '  <td><strong>' + esc(formatMoney(order.totalAmount)) + '</strong></td>';
            html += '  <td>' + statusHtml + '</td>';
            html += '  <td>' + esc(typeof formatDate === 'function' ? formatDate(order.createdAt) : '—') + '</td>';
            html += '  <td><button class="orders-status-btn" data-save-status="' + esc(order.id) + '">Update</button></td>';
            html += '</tr>';
        });

        tbody.innerHTML = html;
    }

    function renderOrderPagination() {
        var container = document.getElementById('adminOrdersPagination');
        if (!container) return;

        if (orderTotalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        var html = '';
        html += '<button class="orders-page-btn" data-order-page="' + (orderPage - 1) + '"' + (orderPage <= 1 ? ' disabled' : '') + '>&laquo; Prev</button>';

        var pageStart = Math.max(1, orderPage - 2);
        var pageEnd = Math.min(orderTotalPages, pageStart + 4);

        if (pageStart > 1) {
            html += '<button class="orders-page-btn" data-order-page="1">1</button>';
            if (pageStart > 2) html += '<span class="orders-muted">...</span>';
        }

        for (var i = pageStart; i <= pageEnd; i += 1) {
            html += '<button class="orders-page-btn' + (i === orderPage ? ' active' : '') + '" data-order-page="' + i + '">' + i + '</button>';
        }

        if (pageEnd < orderTotalPages) {
            if (pageEnd < orderTotalPages - 1) html += '<span class="orders-muted">...</span>';
            html += '<button class="orders-page-btn" data-order-page="' + orderTotalPages + '">' + orderTotalPages + '</button>';
        }

        html += '<button class="orders-page-btn" data-order-page="' + (orderPage + 1) + '"' + (orderPage >= orderTotalPages ? ' disabled' : '') + '>Next &raquo;</button>';

        container.innerHTML = html;
    }

    function buildOrderFilterParams() {
        var params = new URLSearchParams();
        var searchEl = document.getElementById('adminOrderSearch');
        var statusEl = document.getElementById('adminOrderStatusFilter');

        if (statusEl && statusEl.value && statusEl.value !== 'all') {
            params.set('status', statusEl.value);
        }
        if (searchEl && searchEl.value.trim()) {
            params.set('search', searchEl.value.trim());
        }

        return params;
    }

    async function loadOrders(page) {
        var token = getToken();
        if (!token) return;

        orderPage = page || 1;

        var tbody = document.getElementById('adminOrdersTableBody');

        if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="table-empty">Loading orders...</td></tr>';

        var params = buildOrderFilterParams();
        params.set('page', orderPage);
        params.set('limit', 10);

        try {
            var res = await smartFetch(API_URL + '/admin/orders?' + params.toString(), {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            var data = await res.json();

            if (!data.success) {
                if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="table-empty">Failed to load orders</td></tr>';
                setMsg('adminOrdersMsg', data.message || 'Failed to load orders', 'error');
                return;
            }

            orderTotalPages = data.totalPages || 1;
            renderOrders(data.orders || []);
            renderOrderPagination();
            setMsg('adminOrdersMsg', '', null);
        } catch (err) {
            if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="table-empty">Network error while loading orders</td></tr>';
            setMsg('adminOrdersMsg', 'Network error while loading orders', 'error');
        }
    }

    async function updateOrderStatus(orderId, status) {
        var token = getToken();
        if (!token) return;

        try {
            var res = await smartFetch(API_URL + '/admin/orders/' + orderId + '/status', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ status: status })
            });
            var data = await res.json();

            if (!data.success) {
                setMsg('adminOrdersMsg', data.message || 'Failed to update order status', 'error');
                return;
            }

            setMsg('adminOrdersMsg', data.message || 'Order status updated', 'success');
            await loadOrders(orderPage);
        } catch (err) {
            setMsg('adminOrdersMsg', 'Network error while updating order status', 'error');
        }
    }

    function getDownloadNameFromHeader(contentDisposition) {
        var fallback = 'orders-export.xlsx';
        if (!contentDisposition) return fallback;

        var utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        if (utf8Match && utf8Match[1]) {
            try {
                return decodeURIComponent(utf8Match[1]);
            } catch (_) {
                return utf8Match[1];
            }
        }

        var plainMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
        if (plainMatch && plainMatch[1]) return plainMatch[1];
        return fallback;
    }

    async function exportOrdersExcel() {
        var token = getToken();
        if (!token) return;

        var exportBtn = document.getElementById('adminOrdersExportBtn');
        if (exportBtn) {
            exportBtn.disabled = true;
            exportBtn.classList.add('spinning');
            exportBtn.innerHTML = '<svg data-lucide="loader"></svg> Downloading...';
            refreshIcons(exportBtn);
        }

        try {
            var params = buildOrderFilterParams();
            var url = API_URL + '/admin/orders/export' + (params.toString() ? ('?' + params.toString()) : '');

            var res = await smartFetch(url, {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            if (!res.ok) {
                var errMessage = 'Failed to export orders';
                try {
                    var errData = await res.json();
                    if (errData && errData.message) errMessage = errData.message;
                } catch (_) {}
                throw new Error(errMessage);
            }

            var blob = await res.blob();
            if (!blob || !blob.size) {
                throw new Error('Received an empty Excel file');
            }

            var fileName = getDownloadNameFromHeader(res.headers.get('content-disposition'));
            var blobUrl = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);

            setMsg('adminOrdersMsg', 'Orders exported successfully', 'success');
        } catch (err) {
            setMsg('adminOrdersMsg', err.message || 'Network error while exporting orders', 'error');
        } finally {
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.classList.remove('spinning');
                exportBtn.innerHTML = '<svg data-lucide="download"></svg> Export Excel';
                refreshIcons(exportBtn);
            }
        }
    }

    function wireInteractions() {
        var form = document.getElementById('noteProductForm');
        var resetBtn = document.getElementById('noteProductResetBtn');
        var notesRefreshBtn = document.getElementById('ordersNotesRefreshBtn');
        var ordersRefreshBtn = document.getElementById('adminOrdersRefreshBtn');
        var exportBtn = document.getElementById('adminOrdersExportBtn');
        var orderSearch = document.getElementById('adminOrderSearch');
        var orderStatus = document.getElementById('adminOrderStatusFilter');
        var notesTable = document.getElementById('noteProductsTableBody');
        var ordersTable = document.getElementById('adminOrdersTableBody');
        var ordersPagination = document.getElementById('adminOrdersPagination');

        if (form) form.addEventListener('submit', submitNoteProductForm);
        if (resetBtn) resetBtn.addEventListener('click', resetNoteForm);

        if (notesRefreshBtn) {
            notesRefreshBtn.addEventListener('click', function () {
                notesRefreshBtn.classList.add('spinning');
                loadNoteProducts().finally(function () {
                    notesRefreshBtn.classList.remove('spinning');
                });
            });
        }

        if (ordersRefreshBtn) {
            ordersRefreshBtn.addEventListener('click', function () {
                ordersRefreshBtn.classList.add('spinning');
                loadOrders(orderPage).finally(function () {
                    ordersRefreshBtn.classList.remove('spinning');
                });
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', exportOrdersExcel);
        }

        if (orderSearch) {
            orderSearch.addEventListener('input', function () {
                clearTimeout(orderSearchDebounce);
                orderSearchDebounce = setTimeout(function () {
                    loadOrders(1);
                }, 350);
            });
        }

        if (orderStatus) {
            orderStatus.addEventListener('change', function () {
                loadOrders(1);
            });
        }

        if (notesTable) {
            notesTable.addEventListener('click', function (event) {
                var editBtn = event.target.closest('[data-note-edit]');
                if (editBtn) {
                    var noteId = editBtn.getAttribute('data-note-edit');
                    var note = noteProductsCache.find(function (item) { return item.id === noteId; });
                    if (note) fillNoteForm(note);
                    return;
                }

                var toggleBtn = event.target.closest('[data-note-toggle]');
                if (toggleBtn) {
                    var toggleId = toggleBtn.getAttribute('data-note-toggle');
                    var isActive = toggleBtn.getAttribute('data-active') === 'true';
                    toggleNoteStatus(toggleId, !isActive);
                }
            });
        }

        if (ordersTable) {
            ordersTable.addEventListener('click', function (event) {
                var btn = event.target.closest('[data-save-status]');
                if (!btn) return;

                var row = btn.closest('tr');
                var select = row ? row.querySelector('.orders-status-select') : null;
                if (!select) return;

                updateOrderStatus(btn.getAttribute('data-save-status'), select.value);
            });
        }

        if (ordersPagination) {
            ordersPagination.addEventListener('click', function (event) {
                var pageBtn = event.target.closest('[data-order-page]');
                if (!pageBtn) return;

                var page = parseInt(pageBtn.getAttribute('data-order-page'), 10);
                if (Number.isInteger(page) && page >= 1 && page <= orderTotalPages) {
                    loadOrders(page);
                }
            });
        }
    }

    function loadOrdersData() {
        return Promise.all([loadNoteProducts(), loadOrders(1)]);
    }

    function init() {
        var pane = document.getElementById('adminOrdersPane');
        if (!pane) return;

        wireInteractions();
        refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.loadOrdersData = loadOrdersData;
})();
