# Stage 1: Build the React/Vite app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the build output from the previous stage to Nginx's web folder
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for the frontend
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
