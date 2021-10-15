#!/usr/bin/env node
// -*- mode: typescript -*-
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DynamodbLambdaExampleStack } from '../lib/dynamodb-lambda-example-stack';

const app = new cdk.App();
new DynamodbLambdaExampleStack(app, 'ddb-lambda');
