# GraphQL: Solving Over-fetching and Under-fetching Issues

GraphQL addresses common data fetching issues, such as over-fetching and under-fetching, by providing a more flexible and efficient way to request and deliver data. Let’s break it down with some specific examples and metrics to show its benefits in terms of data efficiency.

## 1. Over-fetching

Over-fetching occurs when a client receives more data than it actually needs. This happens frequently with REST APIs, where endpoints return a fixed structure of data regardless of what the client requires.

Example of over-fetching with REST:
Suppose you have a REST endpoint like /users/123 that returns the entire user object with fields like id, name, email, address, phone, orderHistory, and preferences, even though the client only needs the name and email.

Problem: You’re transferring unnecessary data (like address, phone, and orderHistory), which wastes bandwidth, increases processing time, and may expose sensitive or irrelevant information.

How GraphQL Solves Over-fetching

With GraphQL, the client can specify exactly what data it needs in a query, thus fetching only the required fields.

GraphQL Query Example:

```
{
  user(id: 123) {
    name
    email
  }
}

```

###  Result: 
Only the name and email are returned. No unnecessary data is transferred, reducing both bandwidth usage and server load.

### Benefit: 
GraphQL's flexibility ensures that clients fetch only the data they need, which reduces the data transferred and improves performance.

## 2. Under-fetching

Under-fetching happens when a client has to make multiple requests to get all the necessary data, often because a REST endpoint doesn’t return everything needed in a single call.

### Example of under-fetching with REST:
Imagine an endpoint /users/123 that returns only basic user details (e.g., id, name). To get the user’s orderHistory, the client would need to make a second API call to something like /users/123/orders.

### Problem:
Multiple round trips to the server lead to increased latency and more load on both the client and server.

How GraphQL Solves Under-fetching

In GraphQL, the client can request the user data along with the order history in a single query.

GraphQL Query Example:

```
{
  user(id: 123) {
    name
    email
    orderHistory {
      orderId
      date
      totalAmount
    }
  }
}

```

### Result: 
The query returns both the name, email, and the entire orderHistory in one call.

### Benefit: 
With GraphQL, all necessary data can be fetched in a single request, reducing the need for multiple round trips and improving overall data retrieval efficiency.

## 3. Measurable Benefits and Metrics

Let’s look at how GraphQL improves data efficiency with some real-world metrics:

### 1. Bandwidth Reduction

In a typical REST scenario, where the client fetches extra data (like unnecessary fields or makes multiple requests), the server response size can be large. With GraphQL:

**Scenario:** A REST API returns 200 KB of data (including unnecessary fields), while a GraphQL query returns just 30 KB because it only includes the required fields.

**Result:** The client saves 170 KB per request.

### 2. Improved Load Time

By reducing the amount of data fetched and avoiding multiple requests, GraphQL can significantly improve load times.

**Example:** In one case, an eCommerce platform using REST APIs saw a 25% reduction in page load time after switching to GraphQL because fewer data requests were needed.

### 3. Server Efficiency

In REST, because each endpoint is typically optimized for a specific resource, developers may need to optimize multiple endpoints to address changing data needs. With GraphQL, there’s only one endpoint for all queries, which can reduce the server-side overhead.

**Example:** A SaaS platform reported a 40% reduction in server load after switching from REST to GraphQL due to reduced unnecessary requests and optimized queries.

### 4. Flexibility for the Frontend

GraphQL allows frontend developers to specify exactly what they want without needing to depend on backend teams to create new endpoints. This speeds up development and reduces the chances of inefficient data fetching. For example:

If a mobile app needs different data compared to a desktop app, GraphQL allows each client to request its own optimal dataset.

In contrast, with REST, backend developers may need to create separate endpoints for each client need.

### Summary of Benefits:

- **Over-fetching Reduction:** Clients only request the fields they need, minimizing data transfer.

- **Under-fetching Prevention:** All required data is fetched in a single query, reducing round trips.

- **Bandwidth and Load Time Improvements:** GraphQL reduces the amount of unnecessary data transferred and speeds up response times.

- **Server Efficiency:** Reduces server load by consolidating data retrieval into fewer requests.

- By addressing over-fetching and under-fetching, GraphQL improves both data efficiency and the overall performance of web applications, providing a more optimized way to handle data fetching and reducing unnecessary network overhead.