---
code: true
type: page
title: notify:dispatch
---

# notify:dispatch



| Arguments | Type                                                                     | Description                           |
| --------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `message` | [`Notification`](/core/2/api/essentials/notifications) | The normalized real-time notification |

Triggered whenever a real-time notification is about to be sent.

A [pipe](/core/2/plugins/guides/pipes) can block some (or all) notifications by rejecting the provided promise.
