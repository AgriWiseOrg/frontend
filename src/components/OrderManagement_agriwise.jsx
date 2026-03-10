import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, Search, Calendar, User, ArrowLeft, Sprout } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const omTranslations = {
    en: { title: 'Order Management', backDash: 'Back to Dashboard', searchPlaceholder: 'Search by ID, Buyer, or Crop...', total: 'Total', loading: 'Loading Orders...', accessDenied: 'Access Denied', accessMsg: 'Only registered farmers have access to the Order Management dashboard.', goBack: 'Go Back', noOrders: 'No orders found', noOrdersMsg: "We couldn't find any orders matching your criteria. When buyers purchase your crops, they will appear here.", totalAmt: 'Total Amount', currentStatus: 'Current Status', buyerDetails: 'Buyer Details', orderItems: 'Order Items', viewDetails: 'View Details', pending: 'Mark Pending', processing: 'Mark Processing', shipped: 'Mark Shipped', delivered: 'Mark Delivered', cancel: 'Cancel Order' },
    hi: { title: 'αñæαñ░αÑìαñíαñ░ αñ¬αÑìαñ░αñ¼αñéαñºαñ¿', backDash: 'αñíαÑêαñ╢αñ¼αÑïαñ░αÑìαñí αñ¬αñ░ αñ╡αñ╛αñ¬αñ╕', searchPlaceholder: 'ID, αñûαñ░αÑÇαñªαñ╛αñ░, αñ»αñ╛ αñ½αñ╕αñ▓ αñ╕αÑç αñûαÑïαñ£αÑçαñé...', total: 'αñòαÑüαñ▓', loading: 'αñæαñ░αÑìαñíαñ░ αñ▓αÑïαñí αñ╣αÑï αñ░αñ╣αÑç αñ╣αÑêαñé...', accessDenied: 'αñ¬αÑìαñ░αñ╡αÑçαñ╢ αñ¿αñ┐αñ╖αÑçαñº', accessMsg: 'αñòαÑçαñ╡αñ▓ αñ¬αñéαñ£αÑÇαñòαÑâαññ αñòαñ┐αñ╕αñ╛αñ¿αÑïαñé αñòαÑï αñæαñ░αÑìαñíαñ░ αñ¬αÑìαñ░αñ¼αñéαñºαñ¿ αññαñò αñ¬αñ╣αÑüαñéαñÜ αñ╣αÑêαÑñ', goBack: 'αñ╡αñ╛αñ¬αñ╕ αñ£αñ╛αñÅαñé', noOrders: 'αñòαÑïαñê αñæαñ░αÑìαñíαñ░ αñ¿αñ╣αÑÇαñé αñ«αñ┐αñ▓αñ╛', noOrdersMsg: 'αñåαñ¬αñòαÑÇ αñûαÑïαñ£ αñ╕αÑç αñ«αÑçαñ▓ αñûαñ╛αñ¿αÑç αñ╡αñ╛αñ▓αÑç αñòαÑïαñê αñæαñ░αÑìαñíαñ░ αñ¿αñ╣αÑÇαñé αñ«αñ┐αñ▓αÑçαÑñ', totalAmt: 'αñòαÑüαñ▓ αñ░αñ╛αñ╢αñ┐', currentStatus: 'αñ╡αñ░αÑìαññαñ«αñ╛αñ¿ αñ╕αÑìαñÑαñ┐αññαñ┐', buyerDetails: 'αñûαñ░αÑÇαñªαñ╛αñ░ αñ╡αñ┐αñ╡αñ░αñú', orderItems: 'αñæαñ░αÑìαñíαñ░ αñåαñçαñƒαñ«', viewDetails: 'αñ╡αñ┐αñ╡αñ░αñú αñªαÑçαñûαÑçαñé', pending: 'αñ▓αñéαñ¼αñ┐αññ αñÜαñ┐αñ╣αÑìαñ¿αñ┐αññ αñòαñ░αÑçαñé', processing: 'αñ¬αÑìαñ░αñ╕αñéαñ╕αÑìαñòαñ░αñú', shipped: 'αñ¡αÑçαñ£αñ╛ αñùαñ»αñ╛', delivered: 'αñ╡αñ┐αññαñ░αñ┐αññ', cancel: 'αñæαñ░αÑìαñíαñ░ αñ░αñªαÑìαñª αñòαñ░αÑçαñé' },
    te: { title: 'α░åα░░α▒ìα░íα░░α▒ì α░¿α░┐α░░α▒ìα░╡α░╣α░ú', backDash: 'α░íα░╛α░╖α▒ìΓÇîα░¼α▒ïα░░α▒ìα░íα▒ìΓÇîα░òα▒ü α░ñα░┐α░░α░┐α░ùα░┐', searchPlaceholder: 'ID, α░òα▒èα░¿α▒üα░ùα▒ïα░▓α▒üα░ªα░╛α░░α▒ü, α░▓α▒çα░ªα░╛ α░¬α░éα░ƒ α░ªα▒ìα░╡α░╛α░░α░╛ α░╢α▒ïα░ºα░┐α░éα░Üα░éα░íα░┐...', total: 'α░«α▒èα░ñα▒ìα░ñα░é', loading: 'α░åα░░α▒ìα░íα░░α▒ìΓÇîα░▓α▒ü α░▓α▒ïα░íα▒ì α░àα░╡α▒üα░ñα▒üα░¿α▒ìα░¿α░╛α░»α░┐...', accessDenied: 'α░»α░╛α░òα▒ìα░╕α▒åα░╕α▒ì α░¿α░┐α░░α░╛α░òα░░α░┐α░éα░Üα░¼α░íα░┐α░éα░ªα░┐', accessMsg: 'α░¿α░┐α░░α▒ìα░╡α░╣α░┐α░éα░Üα▒ç α░░α▒êα░ñα▒üα░▓α░òα▒ü α░«α░╛α░ñα▒ìα░░α░«α▒ç α░åα░░α▒ìα░íα░░α▒ì α░¿α░┐α░░α▒ìα░╡α░╣α░ú α░»α░╛α░òα▒ìα░╕α▒åα░╕α▒ì α░ëα░éα░ªα░┐.', goBack: 'α░╡α▒åα░¿α░òα▒ìα░òα░┐ α░╡α▒åα░│α▒ìα░│α▒ü', noOrders: 'α░åα░░α▒ìα░íα░░α▒ìΓÇîα░▓α▒ü α░òα░¿α▒üα░ùα▒èα░¿α░¼α░íα░▓α▒çα░ªα▒ü', noOrdersMsg: 'α░«α▒Ç α░¬α▒ìα░░α░«α░╛α░úα░╛α░▓α░òα▒ü α░╕α░░α░┐α░¬α▒ïα░▓α▒ç α░åα░░α▒ìα░íα░░α▒ìΓÇîα░▓α▒ü α░▓α▒çα░╡α▒ü.', totalAmt: 'α░«α▒èα░ñα▒ìα░ñα░é α░«α▒èα░ñα▒ìα░ñα░é', currentStatus: 'α░¬α▒ìα░░α░╕α▒ìα░ñα▒üα░ñ α░╕α▒ìα░Ñα░┐α░ñα░┐', buyerDetails: 'α░òα▒èα░¿α▒üα░ùα▒ïα░▓α▒üα░ªα░╛α░░α▒ü α░╡α░┐α░╡α░░α░╛α░▓α▒ü', orderItems: 'α░åα░░α▒ìα░íα░░α▒ì α░àα░éα░╢α░╛α░▓α▒ü', viewDetails: 'α░╡α░┐α░╡α░░α░╛α░▓α▒ü α░Üα▒éα░íα░éα░íα░┐', pending: 'α░¬α▒åα░éα░íα░┐α░éα░ùα▒ì α░ùα▒üα░░α▒ìα░ñα░┐α░éα░Üα▒ü', processing: 'α░¬α▒ìα░░α░╛α░╕α▒åα░╕α░┐α░éα░ùα▒ì', shipped: 'α░¬α░éα░¬α░┐', delivered: 'α░íα▒åα░▓α░┐α░╡α░░α▒Ç', cancel: 'α░åα░░α▒ìα░íα░░α▒ì α░░α░ªα▒ìα░ªα▒ü' },
    ta: { title: 'α«åα«░α»ìα«ƒα«░α»ì α««α»çα«▓α«╛α«úα»ìα««α»ê', backDash: 'α«ƒα«╛α«╖α»ìα«¬α»ïα«░α»ìα«ƒα»üα«òα»ìα«òα»ü α«ñα«┐α«░α»üα««α»ìα«¬α»ü', searchPlaceholder: 'ID, α«╡α«╛α«Öα»ìα«òα»üα«¬α«╡α«░α»ì α«àα«▓α»ìα«▓α«ñα»ü α«¬α«»α«┐α«░α»ì α«ñα»çα«ƒα»ü...', total: 'α««α»èα«ñα»ìα«ñα««α»ì', loading: 'α«åα«░α»ìα«ƒα«░α»ìα«òα«│α»ì α«Åα«▒α»ìα«▒α»üα«òα«┐α«▒α«ñα»ü...', accessDenied: 'α«àα«úα»üα«òα«▓α»ì α««α«▒α»üα«òα»ìα«òα«¬α»ìα«¬α«ƒα»ìα«ƒα«ñα»ü', accessMsg: 'α«¬α«ñα«┐α«╡α»ü α«Üα»åα«»α»ìα«»α«¬α»ìα«¬α«ƒα»ìα«ƒ α«╡α«┐α«╡α«Üα«╛α«»α«┐α«òα«│α»üα«òα»ìα«òα»ü α««α«ƒα»ìα«ƒα»üα««α»ç α«àα«úα»üα«òα«▓α»ì α«ëα«│α»ìα«│α«ñα»ü.', goBack: 'α«ñα«┐α«░α»üα««α»ìα«¬α»ü', noOrders: 'α«åα«░α»ìα«ƒα«░α»ìα«òα«│α»ì α«çα«▓α»ìα«▓α»ê', noOrdersMsg: 'α«ñα»çα«ƒα«▓α»üα«òα»ìα«òα»ü α«åα«░α»ìα«ƒα«░α»ìα«òα«│α»ì α«òα«┐α«ƒα»êα«òα»ìα«òα«╡α«┐α«▓α»ìα«▓α»ê.', totalAmt: 'α««α»èα«ñα»ìα«ñ α«ñα»èα«òα»ê', currentStatus: 'α«ñα«▒α»ìα«¬α»ïα«ñα»êα«» α«¿α«┐α«▓α»ê', buyerDetails: 'α«╡α«╛α«Öα»ìα«òα»üα«¬α«╡α«░α»ì α«ñα«òα«╡α«▓α»ì', orderItems: 'α«åα«░α»ìα«ƒα«░α»ì α«¬α»èα«░α»üα«ƒα»ìα«òα«│α»ì', viewDetails: 'α«╡α«┐α«╡α«░α«Öα»ìα«òα«│α»ì α«òα«╛α«ú', pending: 'α«¿α«┐α«▓α»üα«╡α»ê α«òα»üα«▒α«┐α«òα»ìα«ò', processing: 'α«Üα»åα«»α«▓α«╛α«òα»ìα«òα««α»ì', shipped: 'α«àα«⌐α»üα«¬α»ìα«¬α«¬α»ìα«¬α«ƒα»ìα«ƒα«ñα»ü', delivered: 'α«╡α«┤α«Öα»ìα«òα«¬α»ìα«¬α«ƒα»ìα«ƒα«ñα»ü', cancel: 'α«åα«░α»ìα«ƒα«░α»ì α«░α«ñα»ìα«ñα»ü' },
    mr: { title: 'αñæαñ░αÑìαñíαñ░ αñ╡αÑìαñ»αñ╡αñ╕αÑìαñÑαñ╛αñ¬αñ¿', backDash: 'αñíαÑàαñ╢αñ¼αÑïαñ░αÑìαñíαñ╡αñ░ αñ¬αñ░αññ', searchPlaceholder: 'ID, αñûαñ░αÑçαñªαÑÇαñªαñ╛αñ░ αñòαñ┐αñéαñ╡αñ╛ αñ¬αÑÇαñò αñ╢αÑïαñºαñ╛...', total: 'αñÅαñòαÑéαñú', loading: 'αñæαñ░αÑìαñíαñ░ αñ▓αÑïαñí αñ╣αÑïαññ αñåαñ╣αÑçαññ...', accessDenied: 'αñ¬αÑìαñ░αñ╡αÑçαñ╢ αñ¿αñ╛αñòαñ╛αñ░αñ▓αñ╛', accessMsg: 'αñòαÑçαñ╡αñ│ αñ¿αÑïαñéαñªαñúαÑÇαñòαÑâαññ αñ╢αÑçαññαñòαñ▒αÑìαñ»αñ╛αñéαñ¿αñ╛ αñæαñ░αÑìαñíαñ░ αñ╡αÑìαñ»αñ╡αñ╕αÑìαñÑαñ╛αñ¬αñ¿ αñëαñ¬αñ▓αñ¼αÑìαñº αñåαñ╣αÑç.', goBack: 'αñ¬αñ░αññ αñ£αñ╛', noOrders: 'αñæαñ░αÑìαñíαñ░ αñåαñóαñ│αñ▓αÑìαñ»αñ╛ αñ¿αñ╛αñ╣αÑÇαññ', noOrdersMsg: 'αñåαñ¬αñ▓αÑìαñ»αñ╛ αñ¿αñ┐αñòαñ╖αñ╛αñ╢αÑÇ αñ£αÑüαñ│αñúαñ╛αñ▒αÑìαñ»αñ╛ αñæαñ░αÑìαñíαñ░ αñåαñóαñ│αñ▓αÑìαñ»αñ╛ αñ¿αñ╛αñ╣αÑÇαññ.', totalAmt: 'αñÅαñòαÑéαñú αñ░αñòαÑìαñòαñ«', currentStatus: 'αñ╕αñºαÑìαñ»αñ╛αñÜαÑÇ αñ╕αÑìαñÑαñ┐αññαÑÇ', buyerDetails: 'αñûαñ░αÑçαñªαÑÇαñªαñ╛αñ░ αññαñ¬αñ╢αÑÇαñ▓', orderItems: 'αñæαñ░αÑìαñíαñ░ αñ¼αñ╛αñ¼αÑÇ', viewDetails: 'αññαñ¬αñ╢αÑÇαñ▓ αñ¬αñ╣αñ╛', pending: 'αñ¬αÑìαñ░αñ▓αñéαñ¼αñ┐αññ αñÜαñ┐αñ¿αÑìαñ╣αñ╛αñéαñòαñ┐αññ αñòαñ░αñ╛', processing: 'αñ¬αÑìαñ░αñòαÑìαñ░αñ┐αñ»αñ╛', shipped: 'αñ¬αñ╛αñáαñ╡αñ▓αÑç', delivered: 'αñ╡αñ┐αññαñ░αñ┐αññ', cancel: 'αñæαñ░αÑìαñíαñ░ αñ░αñªαÑìαñª αñòαñ░αñ╛' },
    kn: { title: 'α▓åα▓░α│ìα▓íα▓░α│ì α▓¿α▓┐α▓░α│ìα▓╡α▓╣α▓úα│å', backDash: 'α▓íα│ìα▓»α▓╛α▓╢α│ìΓÇîα▓¼α│ïα▓░α│ìα▓íα│ìΓÇîα▓ùα│å α▓╣α▓┐α▓éα▓ñα▓┐α▓░α│üα▓ùα▓┐', searchPlaceholder: 'ID, α▓ûα▓░α│Çα▓ªα▓┐α▓ªα▓╛α▓░ α▓àα▓Ñα▓╡α▓╛ α▓¼α│åα▓│α│å α▓╣α│üα▓íα│üα▓òα▓┐...', total: 'α▓Æα▓ƒα│ìα▓ƒα│ü', loading: 'α▓åα▓░α│ìα▓íα▓░α│ìΓÇîα▓ùα▓│α│ü α▓▓α│ïα▓íα│ì α▓åα▓ùα│üα▓ñα│ìα▓ñα▓┐α▓╡α│å...', accessDenied: 'α▓¬α│ìα▓░α▓╡α│çα▓╢ α▓¿α▓┐α▓░α▓╛α▓òα▓░α▓┐α▓╕α▓▓α▓╛α▓ùα▓┐α▓ªα│å', accessMsg: 'α▓¿α│ïα▓éα▓ªα▓╛α▓»α▓┐α▓ñ α▓░α│êα▓ñα▓░α▓┐α▓ùα│å α▓«α▓╛α▓ñα│ìα▓░ α▓¬α│ìα▓░α▓╡α│çα▓╢.', goBack: 'α▓╣α▓┐α▓éα▓ªα│å α▓╣α│ïα▓ùα▓┐', noOrders: 'α▓åα▓░α│ìα▓íα▓░α│ìΓÇîα▓ùα▓│α│ü α▓òα▓éα▓íα│üα▓¼α▓éα▓ªα▓┐α▓▓α│ìα▓▓', noOrdersMsg: 'α▓¿α▓┐α▓«α│ìα▓« α▓«α▓╛α▓¿α▓ªα▓éα▓íα▓òα│ìα▓òα│å α▓╣α│èα▓éα▓ªα▓┐α▓òα│åα▓»α▓╛α▓ùα│üα▓╡ α▓åα▓░α│ìα▓íα▓░α│ìΓÇîα▓ùα▓│α▓┐α▓▓α│ìα▓▓.', totalAmt: 'α▓Æα▓ƒα│ìα▓ƒα│ü α▓«α│èα▓ñα│ìα▓ñ', currentStatus: 'α▓¬α│ìα▓░α▓╕α│ìα▓ñα│üα▓ñ α▓╕α│ìα▓Ñα▓┐α▓ñα▓┐', buyerDetails: 'α▓ûα▓░α│Çα▓ªα▓┐α▓ªα▓╛α▓░ α▓╡α▓┐α▓╡α▓░', orderItems: 'α▓åα▓░α│ìα▓íα▓░α│ì α▓Éα▓ƒα▓éα▓ùα▓│α│ü', viewDetails: 'α▓╡α▓┐α▓╡α▓░ α▓¿α│ïα▓íα▓┐', pending: 'α▓¼α▓╛α▓òα▓┐ α▓ùα│üα▓░α│üα▓ñα▓┐α▓╕α▓┐', processing: 'α▓╕α▓éα▓╕α│ìα▓òα▓░α▓úα│å', shipped: 'α▓òα▓│α│üα▓╣α▓┐α▓╕α▓▓α▓╛α▓ùα▓┐α▓ªα│å', delivered: 'α▓ñα▓▓α│üα▓¬α▓┐α▓╕α▓▓α▓╛α▓ùα▓┐α▓ªα│å', cancel: 'α▓åα▓░α│ìα▓íα▓░α│ì α▓░α▓ªα│ìα▓ªα│ü' },
    pa: { title: 'α¿åα¿░α¿íα¿░ α¿¬α⌐ìα¿░α¿¼α⌐░α¿ºα¿¿', backDash: 'α¿íα⌐êα¿╕α¿╝α¿¼α⌐ïα¿░α¿í α¿ñα⌐ç α¿╡α¿╛α¿¬α¿╕', searchPlaceholder: 'ID, α¿ûα¿░α⌐Çα¿ªα¿ªα¿╛α¿░ α¿£α¿╛α¿é α¿½α¿╝α¿╕α¿▓ α¿ªα⌐üα¿åα¿░α¿╛ α¿ûα⌐ïα¿£α⌐ï...', total: 'α¿òα⌐üα⌐▒α¿▓', loading: 'α¿åα¿░α¿íα¿░ α¿▓α⌐ïα¿í α¿╣α⌐ï α¿░α¿╣α⌐ç α¿╣α¿¿...', accessDenied: 'α¿¬α¿╣α⌐üα⌐░α¿Ü α¿ñα⌐ïα¿é α¿çα¿¿α¿òα¿╛α¿░', accessMsg: 'α¿╕α¿┐α¿░α¿½α¿╝ α¿░α¿£α¿┐α¿╕α¿ƒα¿░α¿í α¿òα¿┐α¿╕α¿╛α¿¿α¿╛α¿é α¿¿α⌐éα⌐░ α¿¬α¿╣α⌐üα⌐░α¿Ü α¿╣α⌐êαÑñ', goBack: 'α¿╡α¿╛α¿¬α¿╕ α¿£α¿╛α¿ô', noOrders: 'α¿òα⌐ïα¿ê α¿åα¿░α¿íα¿░ α¿¿α¿╣α⌐Çα¿é α¿«α¿┐α¿▓α¿┐α¿å', noOrdersMsg: 'α¿ñα⌐üα¿╣α¿╛α¿íα⌐ç α¿«α¿╛α¿¬α¿ªα⌐░α¿íα¿╛α¿é α¿¿α¿╛α¿▓ α¿òα⌐ïα¿ê α¿åα¿░α¿íα¿░ α¿«α⌐çα¿▓ α¿¿α¿╣α⌐Çα¿é α¿ûα¿╛α¿éα¿ªα¿╛αÑñ', totalAmt: 'α¿òα⌐üα⌐▒α¿▓ α¿░α¿òα¿«', currentStatus: 'α¿«α⌐îα¿£α⌐éα¿ªα¿╛ α¿╕α¿Ñα¿┐α¿ñα⌐Ç', buyerDetails: 'α¿ûα¿░α⌐Çα¿ªα¿ªα¿╛α¿░ α¿╡α⌐çα¿░α¿╡α⌐ç', orderItems: 'α¿åα¿░α¿íα¿░ α¿åα¿êα¿ƒα¿«α¿╛α¿é', viewDetails: 'α¿╡α⌐çα¿░α¿╡α⌐ç α¿ªα⌐çα¿ûα⌐ï', pending: 'α¿¼α¿òα¿╛α¿çα¿å α¿Üα¿┐α⌐░α¿¿α¿ñ α¿òα¿░α⌐ï', processing: 'α¿¬α⌐ìα¿░α¿òα¿┐α¿░α¿┐α¿å', shipped: 'α¿¡α⌐çα¿£α¿┐α¿å α¿ùα¿┐α¿å', delivered: 'α¿íα¿┐α¿▓α⌐Çα¿╡α¿░', cancel: 'α¿åα¿░α¿íα¿░ α¿░α⌐▒α¿ª α¿òα¿░α⌐ï' },
    ml: { title: 'α┤ôα╡╝α┤íα╡╝ α┤«α┤╛α┤¿α╡çα┤£α╡ìΓÇîα┤«α╡åα┤¿α╡ìα┤▒α╡ì', backDash: 'α┤íα┤╛α┤╖α╡ìΓÇîα┤¼α╡ïα╡╝α┤íα┤┐α┤▓α╡çα┤òα╡ìα┤òα╡ì α┤«α┤ƒα┤Öα╡ìα┤Öα╡╜', searchPlaceholder: 'ID, α┤╡α┤╛α┤Öα╡ìα┤Öα╡üα┤¿α╡ìα┤¿α┤»α┤╛α╡╛, α┤àα┤▓α╡ìα┤▓α╡åα┤Öα╡ìα┤òα┤┐α╡╜ α┤╡α┤┐α┤│ α┤ñα┤┐α┤░α┤»α╡é...', total: 'α┤åα┤òα╡å', loading: 'α┤ôα╡╝α┤íα┤▒α╡üα┤òα╡╛ α┤▓α╡ïα┤íα╡ì α┤Üα╡åα┤»α╡ìα┤»α╡üα┤¿α╡ìα┤¿α╡ü...', accessDenied: 'α┤åα┤òα╡ìΓÇîα┤╕α┤╕α╡ì α┤¿α┤┐α┤░α┤╕α┤┐α┤Üα╡ìα┤Üα╡ü', accessMsg: 'α┤░α┤£α┤┐α┤╕α╡ìΓÇîα┤ƒα╡ìα┤░α╡çα┤╖α╡╗ α┤ëα┤│α╡ìα┤│ α┤òα╡╝α┤╖α┤òα╡╝α┤òα╡ìα┤òα╡ì α┤«α┤╛α┤ñα╡ìα┤░α┤é α┤åα┤òα╡ìΓÇîα┤╕α┤╕α╡ì.', goBack: 'α┤ñα┤┐α┤░α┤┐α┤Üα╡ìα┤Üα╡ü α┤¬α╡ïα┤òα╡é', noOrders: 'α┤ôα╡╝α┤íα┤▒α╡üα┤òα╡╛ α┤òα┤úα╡ìα┤ƒα╡åα┤ñα╡ìα┤ñα┤┐α┤»α┤┐α┤▓α╡ìα┤▓', noOrdersMsg: 'α┤¿α┤┐α┤Öα╡ìα┤Öα┤│α╡üα┤ƒα╡å α┤«α┤╛α┤¿α┤ªα┤úα╡ìα┤íα┤Öα╡ìα┤Öα┤│α╡üα┤«α┤╛α┤»α┤┐ α┤¬α╡èα┤░α╡üα┤ñα╡ìα┤ñα┤¬α╡ìα┤¬α╡åα┤ƒα╡üα┤¿α╡ìα┤¿ α┤ôα╡╝α┤íα┤▒α╡üα┤òα╡╛ α┤çα┤▓α╡ìα┤▓.', totalAmt: 'α┤åα┤òα╡å α┤ñα╡üα┤ò', currentStatus: 'α┤¿α┤┐α┤▓α┤╡α┤┐α┤▓α╡üα┤│α╡ìα┤│ α┤¿α┤┐α┤▓', buyerDetails: 'α┤╡α┤╛α┤Öα╡ìα┤Öα╡üα┤¿α╡ìα┤¿α┤»α┤╛α╡╛ α┤╡α┤┐α┤╢α┤ªα┤╛α┤éα┤╢α┤Öα╡ìα┤Öα╡╛', orderItems: 'α┤ôα╡╝α┤íα╡╝ α┤çα┤¿α┤Öα╡ìα┤Öα╡╛', viewDetails: 'α┤╡α┤┐α┤╢α┤ªα┤╛α┤éα┤╢α┤Öα╡ìα┤Öα╡╛ α┤òα┤╛α┤úα╡üα┤ò', pending: 'α┤¬α╡åα╡╗α┤íα┤┐α┤éα┤ùα╡ì α┤àα┤ƒα┤»α┤╛α┤│α┤¬α╡ìα┤¬α╡åα┤ƒα╡üα┤ñα╡ìα┤ñα╡üα┤ò', processing: 'α┤¬α╡ìα┤░α╡ïα┤╕α┤╕α╡ìα┤╕α┤┐α┤éα┤ùα╡ì', shipped: 'α┤àα┤»α┤Üα╡ìα┤Üα╡ü', delivered: 'α┤íα╡åα┤▓α┤┐α┤╡α╡╝ α┤Üα╡åα┤»α╡ìα┤ñα╡ü', cancel: 'α┤ôα╡╝α┤íα╡╝ α┤▒α┤ªα╡ìα┤ªα┤╛α┤òα╡ìα┤òα╡üα┤ò' },
};

const OrderManagement = ({ user }) => {
    const navigate = useNavigate();
    const { langCode } = useLanguage();
    const t = omTranslations[langCode] || omTranslations.en;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user || user.role !== 'farmer') {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5001/api/orders/farmer/${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            setUpdatingId(orderId);
            const response = await fetch(`http://localhost:5001/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-yellow-600" />;
            case 'Processing': return <Package size={16} className="text-blue-600" />;
            case 'Shipped': return <Truck size={16} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={16} className="text-green-600" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-600" />;
            default: return <Clock size={16} />;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.includes(searchQuery) ||
        order.items.some(item => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-emerald-700 font-bold">{t.loading}</div>;
    }

    if (!user || user.role !== 'farmer') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <Package size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">{t.accessDenied}</h2>
                <p className="text-slate-500 mb-8 max-w-md">{t.accessMsg}</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> {t.goBack}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans">
            <div className="max-w-7xl mx-auto px-6 pt-12">

                {/* Header Options */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <div>
                        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-emerald-600 font-bold mb-4 flex items-center gap-2 transition-colors">
                            <ArrowLeft size={18} /> {t.backDash}
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                            {t.title}
                            <span className="bg-sky-100 text-sky-700 text-sm font-bold px-3 py-1 rounded-full border border-sky-200">
                                {orders.length} {t.total}
                            </span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-3">Manage incoming orders from buyers and track delivery status.</p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-lg border border-slate-200 flex flex-col items-center">
                        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-400 mb-6">
                            <Package size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">{t.noOrders}</h3>
                        <p className="text-slate-500 font-medium max-w-sm">{t.noOrdersMsg}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 pb-6 border-b border-slate-100">
                                    {/* Order Meta */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">ID: {order._id.slice(-8).toUpperCase()}</span>
                                            <span className="flex items-center gap-1 text-slate-500 text-sm font-medium"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t.buyerDetails}</p>
                                                <p className="font-bold text-slate-800">{order.buyerEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Total & Status Control */}
                                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t.totalAmt}</p>
                                            <p className="text-2xl font-black text-slate-900">Γé╣{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.currentStatus}</p>
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto mt-2 lg:mt-0 flex gap-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                disabled={updatingId === order._id || order.status === 'Cancelled' || order.status === 'Delivered'}
                                                className="w-full lg:w-48 bg-white border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                                            >
                                                <option value="Pending">{t.pending}</option>
                                                <option value="Processing">{t.processing}</option>
                                                <option value="Shipped">{t.shipped}</option>
                                                <option value="Delivered">{t.delivered}</option>
                                                <option value="Cancelled">{t.cancel}</option>
                                            </select>
                                            <button
                                                onClick={() => navigate(`/order/${order._id}`)}
                                                className="w-full lg:w-auto bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-sm rounded-xl px-6 py-3 font-bold transition-all shadow-sm"
                                            >
                                                {t.viewDetails}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Package size={16} className="text-slate-400" />
                                        Order Items ({order.items.length})
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400"><Sprout /></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.crop}</p>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="font-bold text-sky-600">Γé╣{item.price}</span>
                                                        <span className="text-slate-300">|</span>
                                                        <span className="font-medium text-slate-500">Qty: {item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
